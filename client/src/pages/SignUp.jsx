import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'
export function SignUp() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://blogcraft.onrender.com/users/signup', {
                fullname,
                email,
                username,
                password
            });
            if (response.status >= 200 && response.status < 300) {
                navigate('/signin');
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <>
            <main className="form-signin w-100 m-auto d-flex flex-column justify-content-center ">
                <form onSubmit={HandleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingFullName" placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                        <label htmlFor="floatingFullName">Full name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingEmail" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="floatingEmail">Email</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
                </form>
            </main>
        </>);
};