// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {

    // State variables for email and password
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');

    // Get navigation function from react-router-dom
    const navigate = useNavigate();

    // Check if user is already authenticated, then redirect to home page
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, []);

    // Function to handle login form submission
    const login = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const json = await res.json();
            console.log("Login response:", json); // Add this log

            if (json.authtoken) {
                // Store the items
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('email', email);
                console.log("Session storage after login:", {
                    authToken: sessionStorage.getItem('auth-token'),
                    email: sessionStorage.getItem('email')
                }); // Add this log

                navigate('/');
                window.location.reload();
            }
            // ... rest of your code
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    return (
        <div>
            <div className="container">
                <div className="login-grid">
                    <div className="login-text">
                        <h2>Login</h2>
                    </div>
                    <div className="login-text">
                        Are you a new member?
                        <span>
                            <Link to="/Sign_up" style={{ color: '#2190FF' }}>
                                Sign Up Here
                            </Link>
                        </span>
                    </div>
                    <br />
                    <div className="login-form">
                        <form onSubmit={login}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                {/* Input field for email */}
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    aria-describedby="helpId"
                                />
                            </div>
                            {/* Input field for password */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    aria-describedby="helpId"
                                />
                            </div>
                            <div className="btn-group">
                                {/* Login button */}
                                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
