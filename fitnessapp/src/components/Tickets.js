import React, { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import axios from 'axios'

const Tickets = (props) => {
    const { clients } = props
    const [addForm, setAddForm] = useState(false);
    const [client, setClient] = useState();
    const [ticketType, setTicketType] = useState();
    const [buyingPrice, setBuyingPrice] = useState();
    const [avalabileDate, setAvalabileDate] = useState();
    const [firstUsageDate, setFirstUsageDate] = useState();
    const [roomId, setRoomId] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [rooms, setRooms] = useState();
    const [clientTickets, setClientTickets] = useState();
    const [barcode, setBarcode] = useState();

    useEffect(() => {
        getClientTickets()
        getTicketTypes()
        getRooms()
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
        axios.get('https://localhost:5001/tickettypes')
            .then((response) => {
                setTicketTypes(response.data)
            }).catch((error) => {
                console.log("getTicketTypes error", error)
            });
    }

    const getRooms = () => {
        axios.get('https://localhost:5001/rooms')
            .then(response => {
                setRooms(response.data)
            })
            .catch(error => {
                console.log("getRooms", error)
            })
    }

    const addNewClientTicket = () => {
        if (!client || !ticketType || !buyingPrice || !avalabileDate || !firstUsageDate || !barcode) {
            alert("Missing datas!")
        }
        else {
            const newTicket = {
                "clientId": clients.filter(x => x.email === client)[0].id,
                "ticketTypeId": ticketTypes.filter(x => x.name === ticketType)[0].id,
                "buyingPrice": buyingPrice,
                "avalabileDate": avalabileDate,
                "firstUsageDate": firstUsageDate,
                "roomId": rooms.filter(x => x.name === roomId)[0].id,
                "barcode": barcode
            }

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
                            <select onChange={(e) => setClient(e.target.value)}>
                                <option selected disabled>Select client</option>
                                {clients.map(client => <option key={client.id}>{client.email}</option>)}
                            </select>
                        </label>
                        <label>
                            Ticket barcode:
                            <select onChange={(e) => setBarcode(e.target.value)}>
                                <option selected disabled>Select barcode</option>
                                {(clients.filter(x => x.email === client)).map(x => <option key={x.id}>{x.barcode}</option>)}
                            </select>
                        </label>
                        <label>
                            Ticket type:
                            <select onChange={(e) => setTicketType(e.target.value)}>
                                <option selected disabled>Select ticket</option>
                                {ticketTypes.map(ticket => <option key={ticket.id}>{ticket.name}</option>)}
                            </select>
                        </label>
                        <label>
                            Room:
                            <select onChange={(e) => setRoomId(e.target.value)}>
                                <option selected disabled>Select room</option>
                                {rooms.map(room => <option key={room.id}>{room.name}</option>)}
                            </select>
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
                    </form>
                    <Button size="sm" className="saveButton" onClick={addNewClientTicket}>Save</Button>
                </section>}
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Ticket Type</th>
                            <th>Buying Date</th>
                            <th>Barcode</th>
                            <th>Entry Count</th>
                            <th>Buying Price</th>
                            <th>Avalabile Date</th>
                            <th>First Usage Date</th>
                            <th>RoomId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientTickets && ticketTypes && rooms && clientTickets.map(ticket =>
                            <tr key={ticket.id}>
                                <td>{clients.filter(x => x.id === ticket.clientId)[0].name}</td>
                                <td>{ticketTypes.filter(x => x.id === ticket.ticketTypeId)[0].name}</td>
                                <td>{ticket.buyingDate.substring(0, ticket.buyingDate.length - 23)}</td>
                                <td>{ticket.barcode}</td>
                                <td>{ticket.entryCount}</td>
                                <td>{ticket.buyingPrice}</td>
                                <td>{ticket.avalabileDate.substring(0, ticket.avalabileDate.length - 15)}</td>
                                <td>{ticket.firstUsageDate.substring(0, ticket.firstUsageDate.length - 15)}</td>
                                <td>{rooms.filter(x => x.id === ticket.roomId)[0].name}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Tickets
