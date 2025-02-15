import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ProfileCard.css"

const ProfileCard = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        if (storedEmail) {
            // Extract username from email
            const name = storedEmail.split('@')[0];
            setUsername(name.charAt(0).toUpperCase() + name.slice(1));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.removeItem("doctorData");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        window.location.reload();
    };

    return (
        <div className="welcome-user">
            <span>Welcome, {username}</span>
            <ul className="dropdown-menu">
                <li>
                    <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                    <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ProfileCard;