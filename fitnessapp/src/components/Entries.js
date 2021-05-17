import { Table, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entries = (props) => {
    const { handleLogOut, user, setUser, clients, getClients } = props
    const [addFormBarcode, setAddFormBarcode] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [client, setClient] = useState();
    const [ticket, setTicket] = useState();
    const [date, setDate] = useState();
    const [insertedBy, setInsertedBy] = useState();
    const [barcode, setBarcode] = useState();
    const [roomId, setRoomId] = useState();
    const [entries, setEntries] = useState();
    const [clientTickets, setClientTickets] = useState();
    const [selectedTicket, setSelectedTicket] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();

    useEffect(() => {
        getEntries()
        getClientTickets()
        getTicketTypes()
        getRooms()
    }, [])

    const getEntries = () => {
        axios.get('https://localhost:5001/entries')
            .then(response => {
                setEntries(response.data)
            })
            .catch(error => {
                console.log("getEntries", error)
            })
    }

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

    const newEntry = () => {

    }

    const searchBarcode = () => {
        let result = clientTickets.filter(x => x.barcode === parseInt(barcode))
        if (result.length !== 0) {
            setClient(clients.filter(x => x.barcode === parseInt(barcode))[0])
            setTicket(clientTickets.filter(x => x.barcode === parseInt(barcode)))
            setAddForm(!addForm)
        }
        else {
            alert("Barcode not found in our database!")
        }
        console.log(ticket)
    }

    const addFormHandler = () => {
        setAddFormBarcode(!addFormBarcode)
        if (addForm) { setAddForm(!addForm) }
    }


    return (
        <div>
            <Button variant="primary" size="lg" className="addButton" onClick={addFormHandler}> New Entry</Button>

            <div className="container-wrapper">
                {addFormBarcode && <section className="addForm">
                    <form>
                        <label> Barcode </label>
                        <input type="number" name="barcode" value={barcode} onChange={(e) => {
                            setBarcode(e.target.value)
                        }}></input>
                    </form>
                    <Button size="sm" onClick={searchBarcode} className="nextButton">Next</Button>
                </section>}
                {addForm && <section className="addForm">
                    <form >
                        <label>
                            Client:
                                    <input disabled type="text" name="client" value={client.name} />
                        </label>
                        <label>
                            Ticket:
                            <select onChange={(e) => setSelectedTicket(e.target.value)}>
                                <option selected disabled>Select ticket</option>
                                {(clientTickets.filter(x => x.barcode === parseInt(barcode))).map(ticket =>
                                    <option key={ticket.id}>{ticketTypes.filter(x => x.id === ticket.ticketTypeId)[0].name}</option>)}
                            </select>
                        </label>
                        <label>
                            Room:
                                    {/* <input type="number" name="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} /> */}
                            <select onChange={(e) => setSelectedRoom(e.target.value)}>
                                <option selected disabled>Select room</option>
                                {(clientTickets.filter(x => x.barcode === parseInt(barcode))).map(ticket =>
                                    <option key={ticket.id}>{rooms.filter(x => x.id === ticket.roomId)}</option>)}
                            </select>
                        </label>
                    </form>
                    <Button size="sm" onClick={newEntry} className="saveButton">Save</Button>
                </section>}
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Ticket</th>
                            <th>Date</th>
                            <th>Inserted By</th>
                            <th>Barcode</th>
                            <th>RoomId</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries && entries.map(enrty =>
                            <tr key={enrty.id}>
                                <td>{enrty.clientId}</td>
                                <td>{enrty.ticketId}</td>
                                <td>{enrty.date.substring(0, client.insertedDate.length - 23)}</td>
                                <td>{enrty.insertedById}</td>
                                <td>{enrty.barcode}</td>
                                <td>{enrty.roomId}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}


export default Entries
