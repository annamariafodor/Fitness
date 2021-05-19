import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

const MyTickets = (props) => {
    const { user, clients } = props
    const [myTickets, setMyTickets] = useState();
    const [ticketTypes, setTicketTypes] = useState();
    const [clientTickets, setClientTickets] = useState();

    useEffect(() => {
        getClientTickets()
        getTicketTypes()
        // getMyTickets()
    }, [])

    const getMyTickets = () => {
        const id = clients.filter(x => x.email === user.email)[0].id
        if (clientTickets) { setMyTickets(clientTickets.filter(x => x.clientId === id)) }
        console.log("clientTickets: ", clientTickets)
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

    return (
        <div className="container-wrapper">
            <h2>My tickets</h2>
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
                    {myTickets && ticketTypes && myTickets.map(ticket =>
                        <tr key={ticket.id}>
                            <td>{clients.filter(x => x.id === ticket.clientId)[0].name}</td>
                            <td>{ticketTypes.filter(x => x.id === ticket.ticketTypeId)[0].name}</td>
                            <td>{ticket.buyingDate.substring(0, ticket.buyingDate.length - 23)}</td>
                            <td>{ticket.barcode}</td>
                            <td>{ticket.entryCount}</td>
                            <td>{ticket.buyingPrice}</td>
                            <td>{ticket.avalabileDate.substring(0, ticket.avalabileDate.length - 15)}</td>
                            <td>{ticket.firstUsageDate.substring(0, ticket.firstUsageDate.length - 15)}</td>
                            <td>{ticket.roomId}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default MyTickets
