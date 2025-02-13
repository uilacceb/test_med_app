// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
  // State variables using useState hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showerr, setShowerr] = useState(''); // State to show error messages
  const navigate = useNavigate(); // Navigation hook from react-router

  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (!response.ok) {
        const text = await response.text();  // Get plain text if JSON parsing fails
        throw new Error(text || `Error ${response.status}`);
      }

      const json = await response.json(); // Parse only if successful
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        navigate("/");
        window.location.reload();
      } else {
        setShowerr(json.error || "Unknown error");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      setShowerr(error.message);
    }
  };


  // JSX to render the Sign Up form
  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-form">
          <form method="POST" onSubmit={register}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
              {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
            </div>
            <button onClick={register}>register</button>
            <button>reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up; // Export the Sign_Up component for use in other components