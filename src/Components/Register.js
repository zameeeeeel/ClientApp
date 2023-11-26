import React, { useState } from 'react';
import { Link } from "react-router-dom";
//import './App.css';
import './Register.css';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role,setRole]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
//Function to handle register 
    const handleRegister = async (e) => {
        e.preventDefault();
        // Implement your registration logic here
        try {
            // Check if passwords match before making the API call
            if (password !== confirmPassword) {
                console.log('Passwords do not match');
                return;
            }
            else{
                alert("Registered successfully")
            }
let user = {
userName: username,
password: password,
role: 1
};
            // Make an API call to register the user
            const response = await fetch('http://localhost:5159/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
              },
                body: JSON.stringify(user),
                
            });
        

            if (response.ok) {
                // Registration successful
                console.log('User registered successfully!');
                // You can perform additional actions here upon successful registration
            } else {
                // Handle registration failure
                console.error('Registration failed');
                // You can show an error message or perform other actions here
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Handle any network errors or other issues during registration
        }
        // You may want to add API calls or registration logic here
    };

    return (
        <div className="registration-container">
            <div className="registration-form">
                <h2>Register</h2>
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {/* <button className="register-button" onClick={handleRegister}>
                    Register
                </button> */}

                
            <button className="register-button" onClick={handleRegister}><Link to="/login" className="btn btn-primary">Register </Link></button>
         
            </div>
        </div>
    );
};
