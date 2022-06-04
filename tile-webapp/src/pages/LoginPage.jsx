import React from 'react';
import axios from 'axios';
import { useState, useRef } from 'react';
import { Navigate } from "react-router-dom";

const database = {
    "email":"oguzkaganaltas@gmail.com",
    "password":"123"
};


export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        if (email === database.email && password === database.password) {
            setSuccess(true);
        }
        // try {
        //     // axios.post(`${process.env.HOST}:${process.env.PORT}/login`,
        //     //     {
        //     //         email: email,
        //     //         password: password,
        //     //     },
        //     //     {
        //     //         headers: { "content-type": "application/json" }
        //     //     }
        //     // )
        //     //     .then(function (response) {
        //     //         if (response.data === "accessGranted") {
        //     //             console.log("logging in...");
        //     //             setSuccess(true);
        //     //         }
        //     //     })
            

        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg("No Server Response");
        //     }
        //     else if (err.response?.status === 400) {
        //         setErrMsg("Missing Username or Invalid Password!");
        //     }
        //     else {
        //         setErrMsg("Login Failed");
        //     }
        //     errRef.current.focus();
        // }


    }

    return (
        <>
            {success ? (
                <Navigate to="/main" />
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <form onSubmit={handleSubmit}>

                        <div className="form-outline mb-4">
                            <input type="email" id="form2Example1" className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                value={email} />
                            <label className="form-label" htmlFor="form2Example1">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="form2Example2" className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password} />
                            <label className="form-label" htmlFor="form2Example2">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </form>
                </div>
            )
            }
        </>
    )
}
export default LoginPage;