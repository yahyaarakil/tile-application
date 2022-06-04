import React from 'react';
import { useState } from 'react';
import { Navigate } from "react-router-dom";
const User = require("../db/models/user");
export const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");
    
    function getUser(email, password){
        let user;
        try {
            user = await User.findByEmail(email);
            console.log(user);
        } catch (error) {
            console.log("error happened");
        }

        if (user !== null) {
            if(user.password === password){
                setSuccess(true);
            }
        }else{
            setErrMsg("Missing Username or Invalid Password!");
        }
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);
        getUser(email, password);
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