import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [reviewedDoctors, setReviewedDoctors] = useState(new Set());
    const [formData, setFormData] = useState({
        userName: '',
        review: '',
        rating: 0
    });
    const [hoveredRating, setHoveredRating] = useState(0);

    const doctors = [
        {
            serialNumber: 1,
            name: 'Dr. John Doe',
            speciality: 'Cardiology',
        },
        {
            serialNumber: 2,
            name: 'Dr. Jane Smith',
            speciality: 'Dermatology',
        }
    ];

    const handleFeedback = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ userName: '', review: '', rating: 0 });
        setHoveredRating(0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            doctor: selectedDoctor,
            ...formData
        };
        console.log('Feedback submitted:', reviewData);

        setReviewedDoctors(prev => new Set([...prev, selectedDoctor.serialNumber]));
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setFormData(prevData => ({
            ...prevData,
            rating
        }));
    };

    const handleRatingHover = (rating) => {
        setHoveredRating(rating);
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Provide feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.serialNumber}>
                            <td>{doctor.serialNumber}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                                <button
                                    className="feedback-button"
                                    onClick={() => handleFeedback(doctor)}
                                    disabled={reviewedDoctors.has(doctor.serialNumber)}
                                    style={{
                                        backgroundColor: reviewedDoctors.has(doctor.serialNumber) ? '#cccccc' : '#007bff',
                                        cursor: reviewedDoctors.has(doctor.serialNumber) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Click Here
                                </button>
                            </td>
                            <td>
                                {reviewedDoctors.has(doctor.serialNumber) && "✓"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Provide Feedback for {selectedDoctor?.name}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="userName">Your Name:</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="review">Your Review:</label>
                                <textarea
                                    id="review"
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Rating:</label>
                                <div className="rating-container" style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <Star
                                            key={rating}
                                            size={24}
                                            style={{ cursor: 'pointer' }}
                                            fill={(hoveredRating || formData.rating) >= rating ? '#ffd700' : 'none'}
                                            stroke={(hoveredRating || formData.rating) >= rating ? '#ffd700' : '#000'}
                                            onClick={() => handleRatingClick(rating)}
                                            onMouseEnter={() => handleRatingHover(rating)}
                                            onMouseLeave={() => handleRatingHover(0)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="submit-button">Submit</button>
                                <button type="button" className="cancel-button" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;