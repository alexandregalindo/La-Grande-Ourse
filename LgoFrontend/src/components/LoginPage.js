//loginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import '../App.css';

function Login() {

    const history = useHistory();



    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const token = localStorage.getItem("token");

    fetch("http://lagrandeourse.institutgrassetinfo.com:4080", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://lagrandeourse.institutgrassetinfo.com:4081/api/user/login', formData);
            const { token, name, role } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', role);
            history.push('/Layout');
        } catch (error) {
            console.error('Login error', error);
            alert('Entrées invalides');
        }
    }



    const header = (
        <img alt="Card" src={logo} className="card-header-image" />
    );
    const footer = (
        <span>
            <Button label="Se connecter" onClick={handleSubmit} />
        </span>
    );

    return (
        <div className="centered-content">
            <Card footer={footer} header={header} className="login-card">
                <div className="p-field">
                    <label htmlFor="email">Login</label>
                    <input type="email" name="email" onChange={handleChange} placeholder="Example@gmail.com" />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Entrez votre mot de passe" />
                </div>
            </Card>
        </div>
    );
}

export default Login;
