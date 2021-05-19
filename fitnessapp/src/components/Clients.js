import { Table, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import axios from 'axios'

const Clients = (props) => {
    const { clients, getClients } = props
    const [addForm, setAddForm] = useState(false);
    const [name, setName] = useState();
    const [telephone, setTelephone] = useState();
    const [email, setEmail] = useState();
    const [cnp, setCnp] = useState();
    const [adress, setAddress] = useState();
    const [comment, setComment] = useState();

    const saveClient = () => {
        if (!name || !telephone || !email || !cnp || !adress || !comment) {
           alert("Missing datas!")
        }
        else {
            const client = {
                "name": name,
                "telephone": telephone,
                "email": email,
                "cnp": cnp,
                "adress": adress,
                "comment": comment,
                "isDeleted": false
            }


            axios.post('https://localhost:5001/clients', client)
                .then(response => {
                    getClients()
                })
                .catch(error => {
                    console.log("Client post error", error)
                })

        }

    }


    return (
        <div>
            <Button variant="primary" size="lg" className="addButton" onClick={() => setAddForm(!addForm)}> Add client</Button>

            <div className="container-wrapper">
                {addForm && <section className="addForm">
                    <form >
                        <label>
                            Name:
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Telephone:
                                    <input type="number" name="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                        </label>
                        <label>
                            Email:
                                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            CNP:
                                    <input type="number" name="cnp" value={cnp} onChange={(e) => setCnp(e.target.value)} />
                        </label>
                        <label>
                            Address:
                                    <input type="text" name="adress" value={adress} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                        <label>
                            Comment:
                                    <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </label>
                    </form>
                    <Button size="sm" onClick={saveClient} className="saveButton">Save</Button>
                </section>}
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Inserted Date</th>
                            <th>CNP</th>
                            <th>Address</th>
                            <th>Barcode</th>
                        </tr>
                    </thead>
                    <tbody>
                            {clients.map(client =>
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.telephone}</td>
                                    <td>{client.email}</td>
                                    <td>{client.insertedDate.substring(0, client.insertedDate.length - 23)}</td>
                                    <td>{client.cnp}</td>
                                    <td>{client.adress}</td>
                                    <td>{client.barcode}</td>
                                </tr>
                            )}
                    </tbody>
                </Table>

            </div>
        </div>
    )
}

export default Clients
