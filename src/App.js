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
import DoctorCard from './Components/DoctorCard/DoctorCard.js';
import BookingConsultation from './Components/BookingConsultation.js';
import Notification from './Components/Notification/Notification.js';
import ReviewForm from './Components/ReviewForm/ReviewForm.js';

// Function component for the main App
function App() {

    // Render the main App component
    return (
        <div className="App">
            <BrowserRouter>
                <Notification>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/instant-consultation" element={<InstantConsultation />} />
                        <Route path="/findDoctor" element={<FindDoctorSearch />} />
                        <Route path="/doctorCard" element={<DoctorCard />} />
                        <Route path="/reviews" element={<ReviewForm />} />

                    </Routes>
                </Notification>
            </BrowserRouter>
        </div>
    );
}

// Export the App component as the default export
export default App;