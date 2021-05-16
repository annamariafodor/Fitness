import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const Tickets = (props) => {
    const { handleLogOut, user, setUser, clients, getClients } = props
    const [addForm, setAddForm] = useState(false);
    const [client, setClient] = useState();
    const [ticketType, setTicketType] = useState();
    const [buyingPrice, setBuyingPrice] = useState();
    const [avalabileDate, setAvalabileDate] = useState();
    const [firstUsageDate, setFirstUsageDate] = useState();
    const [roomId, setRoomId] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [clientTickets, setClientTickets] = useState();



    useEffect(() => {
        getClientTickets()
        getTicketTypes()
    }, [])

    const getClientTickets = () => {
        axios.get('https://localhost:5001/clienttickets')
            .then(response => {
                setClientTickets(response.data)
            })
            .catch(error => {
                console.log("getClientTickets", error)
            })
    }

    const getTicketTypes = () => {
        axios.get('https://localhost:5001/tickettypes').then((response) => {
            setTicketTypes(response.data)
        }).catch((error) => { console.log("getTicketTypes error", error) });
    }

    const addNewClientTicket = () => {
        if (!client || !ticketType || !buyingPrice || !avalabileDate || !firstUsageDate || !roomId) {
            console.log("client: ", client)
            console.log("ticketType: ", ticketType)
            console.log("buyingPrice: ", buyingPrice)
            console.log("avalabileDate: ", avalabileDate)
            console.log("firstUsageDate: ", firstUsageDate)
            console.log("roomId: ", roomId)
            alert("Missing datas!")
        }
        else {
            const newTicket = {
                "clientId": clients.filter(x => x.email === client)[0].id,
                "ticketTypeId": ticketTypes.filter(x => x.name === ticketType)[0].id,
                "buyingPrice": buyingPrice,
                "avalabileDate": avalabileDate,
                "firstUsageDate": firstUsageDate,
                "roomId": roomId
            }

            console.log(newTicket)
            axios.post('https://localhost:5001/clienttickets', newTicket)
                .then(response => {
                    getClientTickets()
                })
                .catch(error => {
                    console.log("Client ticket post error", error)
                })

        }
    }

    return (
        <div>
            <Button variant="primary" size="lg" className="addButton" onClick={() => setAddForm(!addForm)}> New ticket</Button>

            <div className="container-wrapper">
                {addForm && <section className="addForm">
                    <form >
                        <label>
                            Client:
                            <select onChange={(e) => setClient(e.target.value)}>{clients.map(client => <option key={client.id}>{client.email}</option>)}</select>

                        </label>
                        <label>
                            Ticket type:
                            <select onChange={(e) => setTicketType(e.target.value)}>{ticketTypes.map(ticket => <option key={ticket.id}>{ticket.name}</option>)}</select>
                        </label>
                        <label>
                            Buying price:
                                    <input type="number" name="buyingPrice" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} />
                        </label>
                        <label>
                            Avalabile date:
                                    <input type="date" name="avalabileDate" value={avalabileDate} onChange={(e) => setAvalabileDate(e.target.value)} />
                        </label>
                        <label>
                            First usage date:
                                    <input type="date" name="firstUsageDate" value={firstUsageDate} onChange={(e) => setFirstUsageDate(e.target.value)} />
                        </label>
                        <label>
                            Room Id:
                                    <input type="number" name="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                        </label>
                    </form>
                    <Button size="sm" className="saveButton" onClick={addNewClientTicket}>Save</Button>
                </section>}
                <Table>
                    <thead>
                        <tr className="row">
                            <th>Client</th>
                            <th>Ticket Type</th>
                            <th>BuyingDate</th>
                            <th>Barcode</th>
                            <th>EntryCount</th>
                            <th>BuyingPrice</th>
                            <th>AvalabileDate</th>
                            <th>FirstUsageDate</th>
                            <th>RoomId</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row">
                            {console.log("ticket: ", clientTickets)}
                            {/* {clientTickets.map(ticket =>
                                <div key={ticket.id}>
                                    <td>{ticket.clientId}</td>
                                    <td>{ticket.ticketTypeId}</td>
                                    <td>{ticket.buyingDate.substring(0, ticket.buyingDate.length - 23)}</td>
                                    <td>{ticket.barcode}</td>
                                    <td>{ticket.entryCount}</td>
                                    <td>{ticket.buyingPrice}</td>
                                    <td>{ticket.avalabileDate.substring(0, ticket.avalabileDate.length - 23)}</td>
                                    <td>{ticket.firstUsageDate.substring(0, ticket.firstUsageDate.length - 23)}</td>
                                    <td>{ticket.roomId}</td>
                                </div>
                            )} */}
                        </tr>
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default Tickets
