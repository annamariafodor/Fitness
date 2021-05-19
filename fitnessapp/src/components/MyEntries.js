import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const MyEntries = (props) => {
    const { user, clients } = props
    const [myTickets, setMyTickets] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [clientTickets, setClientTickets] = useState();
    const [entries, setEntries] = useState();
    const [rooms, setRooms] = useState();
    const [selectedRoom, setSelectedRoom] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getClientTickets()
        getTicketTypes()
        getEntries()
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
                const id = clients.filter(x => x.email === user.email)[0].id
                setMyTickets(response.data.filter(x => x.clientId === id))
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

    const getUsers = () => {
        axios.get('https://localhost:5001/users').then((response) => {
            setUsers(response.data)
        }).catch((error) => { console.log("getUsers error", error) });
    }

    return (
        <div className="container-wrapper">
            <h2>My entries</h2>
            <Table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Ticket</th>
                        <th>Date</th>
                        <th>Barcode</th>
                        <th>RoomId</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && users && rooms && ticketTypes && clientTickets && entries.filter(x => x.clientId === clients.filter(x => x.email === user.email)[0]?.id).map(entry =>
                        <tr key={entry.id}>
                            <td>{clients.filter(x => x.id === entry.clientId)[0].name}</td>
                            <td>{ticketTypes.filter(x => x.id === clientTickets.filter(x => x.id === entry.ticketId)[0].ticketTypeId)[0].name}</td>
                            <td>{entry.date.substring(0, entry.date.length - 23)}</td>
                            <td>{entry.barcode}</td>
                            <td>{rooms.filter(x => x.id === entry.roomId)[0].name}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    )
}


export default MyEntries
