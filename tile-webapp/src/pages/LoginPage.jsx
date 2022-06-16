import React from 'react';
import { useState, useRef} from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';


export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    const errRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post("http://localhost:8080/login",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: { "content-type": "application/json" }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {
                    
                        sessionStorage.setItem('token',JSON.stringify(response.data.token));
                        setSuccess(true);
                    }
                })

        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            }
            else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Invalid Password!");
            }
            else {
                setErrMsg("Login Failed");
            }
            errRef.current.focus();
        }

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