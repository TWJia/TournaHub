import React, { useState } from 'react';
import client from './client';
import { Route, redirect } from 'react-router-dom';

function RegisterForm({ onRegister }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleRegister = async () => {
        try {
            console.log(name, username, dateOfBirth, email, password);
            const response = await client.post('/user/create', {
                name: name,
                username: username,
                dob: dateOfBirth,
                email: email,
                password: password
            });
            console.log(response.data);
            alert("Register Success");
            window.location.replace('/');
            // Anda bisa melakukan sesuatu dengan response jika perlu
        } catch (error) {
            console.error('Terjadi kesalahan saat registrasi:', error);
            alert("Register Failed");
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleRegister();
        // alert("Register Success");
        if (onRegister) {
            onRegister(name, username, dateOfBirth, email, password);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">Date Of Birth:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        value={dateOfBirth}
                                        onChange={e => setDateOfBirth(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
