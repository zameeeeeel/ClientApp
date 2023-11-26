import React, { useState,useEffect } from 'react';
import './AppointmentComponent.css'; // Import CSS file for styling

function Review() {
    const username=sessionStorage.getItem("username");
  const [review, setReview] = useState({
    reviewId: 0,
    doctorId: 0,
    userName: "",
    rating: 0,
    comments: "",
  });
  //Function to fetch reviews
  const [reviews,setReviews]=useState([]);
  useEffect( ()=>{
    const fetchData = async () => {
      const result = await fetch("http://localhost:5159/api/Review/ByPatient/"+username);
      let reviewData = [];
      reviewData = await result.json();
      setReviews(reviewData);
};
fetchData();
});

const [error, setError] = useState('');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

//Function to add review
  const handleSaveReview = async () => {
    try {
      
      console.log()
      const response = await fetch('http://localhost:5159/api/Review/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to save Review');
      }

      const data = await response.json();
      // Handle the response or perform additional actions if needed

      console.log('Review saved:', data);
      // Reset appointment form
      setReview({
        doctorId: review.doctorId,
        userName: review.userName,
        rating: review.rating,
        comments: review.comments,
      });
      setError('');
    } catch (error) {
      setError('Failed to save review. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
         <h3>Reviews</h3>
          <div className="doctors-cards">
            {/* Map through doctors data and render cards */}
            {reviews.map((review) => (
              <div key={review.reviewId} className="doctor-card">
                {/* <img src={doctor.imageUrl} alt={`${doctor.firstName} ${doctor.lastName}`} /> */}
                <h4>Doctor ID: {review.doctorId}</h4>
                <h4>Rating: {review.rating}</h4>
                <p>Comments: {review.comments}</p>
                &nbsp;
                {/* <button onClick={() => bookAppointment(doctor.id)}></button> */}
              </div>
            ))}
          </div>
          &nbsp;
          <div className="appointment-container">
      <h2>Add Review</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="appointment-form">
        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={review.userName}
            onChange={handleInputChange}
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label>Doctor ID:</label>
          <input
            type="number"
            name="doctorId"
            value={review.doctorId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={review.rating}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Comments:</label>
          <input
            type="text"
            name="comments"
            value={review.comments}
            onChange={handleInputChange}
          />
        </div>

        {/* <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleInputChange}
          />
        </div> */}

        {/* <div className="form-group">
          <label>Status:</label>
          <select name="status" value={appointment.status} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Consulted">Consulted</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div> */}
      </div>

      <button className="save-button" onClick={handleSaveReview}>
        Save Review
      </button>
    </div>
    &nbsp;
    </>
  );
}

export default Review;
