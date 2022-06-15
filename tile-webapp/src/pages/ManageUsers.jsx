import React, { useState } from "react";
import axios from "axios";

class UserItem extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            fullName: null,
            telephoneNumber: null,
            role: null
        }
    }

    setFullName = (e) => {
        this.setState({ fullName: e.target.value })
    }

    setTelephoneNumber = (e) => {
        this.setState({ telephoneNumber: e.target.value })
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    setRole = (e) => {
        this.setState({ role: e.target.value })
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post("https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/register",
                this.state,
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        sessionStorage.setItem('token', JSON.stringify(response.data.token));
                        console.log("registered the user");
                    }
                })

        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            }
            else {
                console.log("Login Failed");
            }
        }

    }

    render() {
        return (
            <>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">User</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <p>Full Name</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setFullName(e)} />
                                    <p>Email</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setEmail(e)} />
                                    <p>Password</p>
                                    <input type="password" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setPassword(e)} />
                                    <p>Telephone Number</p>
                                    <input type="tel" id="phone" name="phone" pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" placeholder="0123-456-7890" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setTelephoneNumber(e)} />
                                    <small>Format: 0123-456-7890</small><br /><br />
                                </div>
                                <div className="col-6">

                                    <p>Role</p>
                                    <form>
                                        <input type="radio" id="Manager" value={1} onChange={e => this.setRole(e)} />
                                        <label htmlFor="Manager">Manager</label><br />

                                        <input type="radio" id="Admin" value={2} onChange={e => this.setRole(e)} />
                                        <label htmlFor="Admin">Admin</label><br />

                                        <input type="radio" id="R&D" value={3} onChange={e => this.setRole(e)} />
                                        <label htmlFor="R&D">R&D</label><br />

                                        <input type="radio" id="User" value={4} onChange={e => this.setRole(e)} />
                                        <label htmlFor="User">User</label>
                                    </form>
                                    <button className="btn btn-primary" onClick={this.handleSubmit}>Register User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


class DeleteUser extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedUser: null,
            users: []
        }

        this.getUsers();
    }

    getUsers = async () => {
        let response = null;
        try {
            response = await axios.get('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/users');
        } catch (err) {
            console.error(err);
        }
        this.setState({ users: response.data });
    }

    deleteUser = async (user) => {
        let response = null;
        console.log(user);
        try {
            response = await axios.post('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/users?delete=' + user);
        } catch (err) {
            console.error(err);
        }

    }

    handleUserChange = (e) => {
        this.deleteUser(e.split('-')[0])
    };

    handleSelectedUser = (e) => {
        this.setState({ selectedUser: e.target.value })
    }


    render() {
        return (
            <>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Delete User</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="dropdown">
                                        <select onChange={this.handleSelectedUser} className="btn" >
                                            {this.state.users.map((item) => <option value={item.email}>{item.fullName + "-" + item.role}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary" onClick={e => this.handleUserChange(this.state.selectedUser)}>Delete User</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
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