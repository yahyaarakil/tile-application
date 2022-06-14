import React from "react";
import axios from "axios";

class UserItem extends React.Component {

    constructor() {
        super();
        this.state = {
            code: null,
            company: null,
            name: null,
            price: null,
            alternative: null
        }
    }

    setName = (e) => {
        this.setState({ name: e.target.value })
    }

    setCode = (e) => {
        this.setState({ code: e.target.value })
    }

    setCompany= (e) => {
        this.setState({ company: e.target.value })
    }

    setPrice = (e) => {
        this.setState({ price: e.target.value })
    }

    setAlternative = (e) => {
        this.setState({ alternative: e.target.value })
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(this.state)
            axios.post("https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/addmaterial",
                this.state,
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        sessionStorage.setItem('token', JSON.stringify(response.data.token));
                        console.log("registered the material");
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

    handleDelete = async (e) => {
        e.preventDefault();
        try {
            console.log(this.state)
            axios.delete("https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/deletematerial",
                this.state,
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        sessionStorage.setItem('token', JSON.stringify(response.data.token));
                        console.log("registered the material");
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

    handleUpdate = async (e) => {
        e.preventDefault();
        try {
            console.log(this.state)
            axios.post("https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/updatematerial",
                this.state,
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        sessionStorage.setItem('token', JSON.stringify(response.data.token));
                        console.log("registered the material");
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
                        <h4 className="card-title">Material</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <p>Code</p>
                                    <input type="number" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setCode(e)} />
                                    <p>Name</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setName(e)} />
                                    <p>Company</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setCompany(e)} />
                                    <p>Price</p>
                                    <input type="number" step="0.1" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setPrice(e)} />
                                    <p>Alternative</p>
                                    <input type="number" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setAlternative(e)} />
                                </div>
                                <div className="col-6">
                                    <p>Operations</p>
                                    <button className="btn btn-secondary btn-block" onClick={this.handleSubmit}>Add</button><br/>
                                    <button className="btn btn-secondary btn-block" onClick={this.handleDelete}>Delete</button><br/>
                                    <button className="btn btn-secondary btn-block" onClick={this.handleUpdate}>Update </button><br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}




export const ManageMaterials = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <UserItem />
            </div>
        </>
    );
};