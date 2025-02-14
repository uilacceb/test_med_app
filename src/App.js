// Import necessary modules from React library
import React, { useEffect } from 'react';



// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar.js';
import Landing_Page from './Components/Landing_Page/Landing_Page.js';
import SignUp from './Components/Sign_up/Sign_up.js';
import Login from './Components/Login/Login.js';
import InstantConsultation from "./Components/InstantConsultationBooking/InstantConsultationBooking/InstantConsultation.js"
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch.js"

// Function component for the main App
function App() {

    // Render the main App component
    return (
        <div className="App">
            {/* Set up BrowserRouter for routing */}
            <BrowserRouter>
                {/* Display the Navbar component */}
                <Navbar />

                {/* Set up the Routes for different pages */}
                <Routes>

                    <Route path="/" element={<Landing_Page />} />
                    <Route path="Sign_up" element={<SignUp />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="/instant-consultation" element={<InstantConsultation />} />
                    <Route path="/findDoctor" element={<FindDoctorSearch />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

// Export the App component as the default export
export default App;