import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css'
export function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://blogcraft.onrender.com/users/signin', {
                username,
                password
            });
            if (response.status >= 200 && response.status < 300) {
                const token = response.data.token;
                const author = response.data.username;
                localStorage.setItem('token', token);
                localStorage.setItem('author', author);
                navigate('/');
            } else {
                console.log("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <>
            <main className="form-signin w-100 m-auto d-flex flex-column justify-content-center">
                <form onSubmit={HandleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                </form>
            </main>
        </>);
};