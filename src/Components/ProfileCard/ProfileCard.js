import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({
        name: sessionStorage.getItem("name") || "", // Initialize with session storage
        email: sessionStorage.getItem("email") || "",
        phone: sessionStorage.getItem("phone") || ""
    });
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");
        
        if (!authtoken) {
            navigate("/login");
        } else {
            // If no name is set, use the email username as initial name
            if (!userDetails.name && email) {
                const nameFromEmail = email.split('@')[0];
                const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
                setUserDetails(prev => ({
                    ...prev,
                    name: capitalizedName
                }));
                sessionStorage.setItem("name", capitalizedName);
            }
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken) {
                navigate("/login");
            } else {
                const response = await fetch(`${API_URL}/api/auth/user`, {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Email": email,
                    },
                });
                if (response.ok) {
                    const user = await response.json();
                    // Merge existing and new data, prioritizing server data
                    setUserDetails(prev => ({
                        ...prev,
                        ...user,
                        name: user.name || prev.name // Keep existing name if server doesn't provide one
                    }));
                    setUpdatedDetails(user);
                    
                    // Update session storage with server data
                    if (user.name) sessionStorage.setItem("name", user.name);
                    if (user.phone) sessionStorage.setItem("phone", user.phone);
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleEdit = () => {
        setUpdatedDetails(userDetails);
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");

            if (!authtoken || !email) {
                navigate("/login");
                return;
            }

            const response = await fetch(`${API_URL}/api/auth/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
                body: JSON.stringify(updatedDetails),
            });

            if (response.ok) {
                // Update session storage
                sessionStorage.setItem("name", updatedDetails.name);
                sessionStorage.setItem("phone", updatedDetails.phone);

                // Update state
                setUserDetails(updatedDetails);
                setEditMode(false);
                
                alert(`Profile Updated Successfully!`);
                navigate("/");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="profile-container">
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={userDetails.email}
                            disabled
                        />
                    </label>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={updatedDetails.name || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone
                        <input
                            type="text"
                            name="phone"
                            value={updatedDetails.phone || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className="profile-details">
                    <h1>Welcome, {userDetails.name}</h1>
                    {/* <p><b>Email:</b> {userDetails.email}</p>
                    <p><b>Phone:</b> {userDetails.phone}</p> */}
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;