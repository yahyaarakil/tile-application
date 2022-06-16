import React from "react";
import axios from "axios";

class UserItem extends React.Component {

    constructor() {
        super();
        this.state = {
            Code: null,
            Company: null,
            Name: null,
            Price: null,
            Alternative: null
        }
    }

    setName = (e) => {
        this.setState({ Name: e.target.value })
    }

    setCode = (e) => {
        this.setState({ Code: e.target.value })
    }

    setCompany= (e) => {
        this.setState({ Company: e.target.value })
    }

    setPrice = (e) => {
        this.setState({ Price: e.target.value })
    }

    setAlternative = (e) => {
        this.setState({ Alternative: e.target.value })
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(this.state)
            axios.post("http://localhost:8080/addmaterial",
                this.state,
                {
                    headers: { "content-type": "application/json",
                                "token":sessionStorage.getItem("token") }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        console.log("registered the material");
                        window.alert('registered the material');
                        window.location.reload();
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
            axios.post("http://localhost:8080/addmaterial",
                this.state,
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        console.log("registered the material");
                        window.alert('registered the material');
                        window.location.reload();
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
                                    <button className="btn btn-primary btn-block" onClick={this.handleSubmit}>Add</button><br/><br/>
                                    <button className="btn btn-primary btn-block" onClick={this.handleUpdate}>Update </button>
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