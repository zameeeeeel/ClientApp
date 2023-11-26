import React, { useState,useEffect } from 'react';
import './AppointmentComponent.css'; // Import CSS file for styling

function AppointmentComponent(props) {
  const username=sessionStorage.getItem("username");
  const [appointment, setAppointment] = useState({
    appointmentId: 0,
    userName: "",
    doctorId: 0,
    appointmentDate: new Date(),
    status: 0,
  });
  
  const [appointments,setAppointments] = useState([]);
  //Function to fetch appoinments by username
  useEffect( ()=>{
      const fetchData = async () => {
        const result = await fetch("http://localhost:5159/api/Appointment/ByUsername/"+username);
        let appointmentData = [];
        appointmentData = await result.json();
        setAppointments(appointmentData);
  };
  fetchData();
  });

  const [error, setError] = useState('');
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

const getStatuslabel=(status)=>{
  if(status===0){
    return "Pending";
  }
  else if(status===1){
    return "Confirmed";
  }
  else if(status===1){
    return "Consulted";
  }
  else{
    return "Cancelled";
  }

}
//Function to save appoinments 
  const handleSaveAppointment = async () => {
    try {
      
      console.log()
      const response = await fetch('http://localhost:5159/api/Appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(appointment),
      });

      if (!response.ok) {
        throw new Error('Failed to save appointment');
      }

      const data = await response.json();
      // Handle the response or perform additional actions if needed

      console.log('Appointment saved:', data);
      // Reset appointment form
      setAppointment({
        userName: appointment.userName,
        doctorId: appointment.doctorId,
        appointmentDate: appointment.appointmentDate,
        status: 0,
      });
      setError('');
    } catch (error) {
      setError('Failed to save appointment. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <>
    <h3>Appointments</h3>
          <div className="doctors-cards">
            {/* Map through doctors data and render cards */}
            {appointments.map((appointment) => (
              <div key={appointment.appointmentId} className="doctor-card">
                {/* <img src={doctor.imageUrl} alt={`${doctor.firstName} ${doctor.lastName}`} /> */}
                <h4>Doctor ID: {appointment.doctorId}</h4>
                <h4>{appointment.appointmentDate}</h4>
                <p>{getStatuslabel(appointment.status)}</p>
                &nbsp;
                {/* <button onClick={() => bookAppointment(doctor.id)}></button> */}
              </div>
            ))}
          </div>&nbsp;



    <div className="appointment-container">
      <h2>Book Appointment</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="appointment-form">
        <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={appointment.userName}
            onChange={handleInputChange}
            maxLength={30}
          />
        </div>

        <div className="form-group">
          <label>Doctor ID:</label>
          <input
            type="number"
            name="doctorId"
            value={appointment.doctorId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={appointment.appointmentDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={appointment.status} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Consulted">Consulted</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <button className="save-button" onClick={handleSaveAppointment}>
        Save Appointment
      </button>
    </div>
    &nbsp;
    </>
  );
}

export default AppointmentComponent;
