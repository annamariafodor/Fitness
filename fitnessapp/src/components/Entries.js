import { Table, Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Entries = (props) => {
    const {  user, clients } = props
    const [addFormBarcode, setAddFormBarcode] = useState(false);
    const [addForm, setAddForm] = useState(false);
    const [client, setClient] = useState();
    const [ticket, setTicket] = useState();
    const [barcode, setBarcode] = useState();
    const [entries, setEntries] = useState();
    const [clientTickets, setClientTickets] = useState();
    const [selectedTicket, setSelectedTicket] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();
    const [users, setUsers] = useState([]);
    const [successfulEntry, setSuccessfulEntry] = useState(false);

    useEffect(() => {
        getEntries()
        getClientTickets()
        getTicketTypes()
        getRooms()
        getUsers()
    }, [])

    const getUsers = () => {
        axios.get('https://localhost:5001/users').then((response) => {
            setUsers(response.data)
        }).catch((error) => { console.log("getUsers error", error) });
    }

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
        if (!selectedTicket || !selectedRoom || !barcode || !client) {
            alert("Missing datas!")
        }
        else {
            const newEntry = {
                "clientId": client.id,
                "ticketId": ticket.filter(x => x.ticketTypeId === ticketTypes.filter(x => x.name === selectedTicket)[0].id)[0].id,
                "insertedById": user.id,
                "barcode": barcode,
                "roomId": rooms.filter(x => x.name === selectedRoom)[0].id
            }

            console.log("asd ", newEntry)

            axios.post('https://localhost:5001/entries', newEntry)
                .then(response => {
                    getEntries()
                })
                .catch(error => {
                    console.log("Entries post error", error)
                })

            const val = clientTickets.filter(x => x.barcode === parseInt(barcode))[0].entryCount
            const updatedTicket = { ...clientTickets.filter(x => x.barcode === parseInt(barcode))[0], entryCount: val + 1 }

            axios.put('https://localhost:5001/clienttickets/' + newEntry.ticketId, updatedTicket)
                .then(response => {
                    getEntries()
                    getClientTickets()
                })
                .catch(error => {
                    console.log("ticket put error", error)
                })

            setSuccessfulEntry(!successfulEntry)

        }
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
                            <select onChange={(e) => setSelectedRoom(e.target.value)}>
                                <option selected disabled>Select room</option>
                                {selectedTicket && (rooms.filter(x => x.id === ((clientTickets.filter(
                                    x => x.barcode === parseInt(barcode) &&
                                        x.ticketTypeId === ticketTypes.filter(
                                            x => x.name === selectedTicket)[0].id)[0]?.roomId)))).map(ticket =>
                                                <option key={ticket.id}>{ticket.name}</option>)}
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
                        {entries && users && rooms && ticketTypes && clientTickets && entries.map(entry =>
                            <tr key={entry.id}>
                                <td>{clients.filter(x => x.id === entry.clientId)[0].name}</td>
                                <td>{ticketTypes.filter(x => x.id === clientTickets.filter(x => x.id === entry.ticketId)[0].ticketTypeId)[0].name}</td>
                                <td>{entry.date.substring(0, entry.date.length - 23)}</td>
                                <td>{clients.filter(x => x.email === users.filter(x => x.id === entry.insertedById)[0]?.email)[0]?.name}</td>
                                <td>{entry.barcode}</td>
                                <td>{rooms.filter(x => x.id === entry.roomId)[0].name}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}


export default Entries
