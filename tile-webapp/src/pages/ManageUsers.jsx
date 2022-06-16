import React, { useState, useEffect } from "react";
import axios from "axios";


function UserItem() {

    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const [FullName, setFullName] = useState();
    const [TelephoneNumbers, setTelephoneNumbers] = useState([]);
    const [Role, setRole] = useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log({
                Email:Email,
                Password:Password,
                FullName:FullName,
                TelephoneNumbers:[TelephoneNumbers],
                Role:Role
            })
            axios.post("http://localhost:8080/register",
            {
                Email:Email,
                Password:Password,
                FullName:FullName,
                TelephoneNumbers:[TelephoneNumbers.toString()],
                Role:parseInt(Role)
            },
                {
                    headers: { "content-type": "application/json" ,
                "token":sessionStorage.getItem("token")}
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        console.log("registered the user");
                        window.alert('registered the user');
                        window.location.reload();
                    }
                })

        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            }
            else {
                console.log("register Failed");
            }
        }

    }

    return (
            <div className="card" >
                <div className="card-body">
                    <h4 className="card-title">User</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p>Full Name</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setFullName(e.target.value)} />
                                <p>Email</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setEmail(e.target.value)} />
                                <p>Password</p>
                                <input type="password" className="form-control" aria-describedby="basic-addon1" onChange={e => setPassword(e.target.value)} />
                                <p>Telephone Number</p>
                                <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" placeholder="0123-456-7890" className="form-control" aria-describedby="basic-addon1" onChange={e => setTelephoneNumbers(e.target.value)} />
                                <small>Format: 0123-456-7890</small><br /><br />
                            </div>
                            <div className="col-6">

                                <p>Role</p>
                                <form>
                                    <input type="radio" id="Manager" value={1} onChange={(e) => setRole(e.target.value)} />
                                    <label htmlFor="Manager">Manager</label><br />

                                    <input type="radio" id="Admin" value={2} onChange={(e )=> setRole(e.target.value)} />
                                    <label htmlFor="Admin">Admin</label><br />

                                    <input type="radio" id="R&D" value={3} onChange={(e) => setRole(e.target.value)} />
                                    <label htmlFor="R&D">R&D</label><br />

                                    <input type="radio" id="User" value={4} onChange={(e) => setRole(e.target.value)} />
                                    <label htmlFor="User">User</label>
                                </form>
                                <button className="btn btn-primary" onClick={handleSubmit}>Register User</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}


export const ManageUsers = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <UserItem />
            </div>
        </>
    );
};