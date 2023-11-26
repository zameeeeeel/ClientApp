import { useState,useEffect } from 'react';
import React from 'react';
import './Main.css'
import { Link } from 'react-router-dom';
import s1 from '../Images/cardiologist.jpg';
import s2 from '../Images/dermatologist.jpg';
import s3 from '../Images/physician.jpg';
import s4 from '../Images/dental.jpg';
import doc from '../Images/doc.jpg';


function MainComponent(props) {
    
  // Sample doctor data (replace this with your actual data)
  const[doctors,setDoctors]=useState([]);
  const[specialization,setSpecialization]=useState('');
  const [filteredDoctors,setFilteredDoctors]=useState([]);
  const [doctor,setDoctor] = useState(
    { firstName:"",lastName:"",gender:0,dateOfBirth:new Date(),mobileNo:"",address:"",specialization:"",availableFromDate:new Date(),availableToDate:new Date(),doctorImage:"0x30" });
  //Function to fetch doctor 
    useEffect(()=>{
    fetch("http://localhost:5159/api/Doctor").then(result=>result.json()).then(result=>{
        setDoctors(result);
        //setFilteredDoctors(data);
    });
  },[]);

  const fetchDoctors=async()=>{
    try{
      const response=await fetch('http://localhost:5159/api/Doctor');
      const data=await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
    }catch(error){
      console.error('Error fetching doctors:',error);
    }
  };
  console.log(doctors);
  //Function to search doctors by speciality
  const handleSearch=()=>{
    const filtered=doctors.filter(
      (doctor)=>
      doctor.specialization.toLowerCase()===specialization.toLowerCase()
    );
    setFilteredDoctors(filtered);
  }
  const Speciality = [
    { id: 1, specialty: 'Cardiology', imageUrl: s1 },
    { id: 2,specialty: 'Dermatology', imageUrl: s2 },
    { id: 3, specialty: 'Physician', imageUrl: s3 },
    { id: 4, specialty: 'Dental', imageUrl: s4 },
    
    // Add more doctor data as needed
  ];
  

  // const Articles = [
  //   { id: 1, name: 'ABCD', specialty: 'Cardiologist', imageUrl: 'doctor1.jpg' },
  //   { id: 2, name: 'EFGH', specialty: 'Dermatologist', imageUrl: 'doctor2.jpg' },
  //   { id: 2, name: 'IJKL', specialty: 'Dermatologist', imageUrl: 'doctor2.jpg' },
    
  //   // Add more doctor data as needed
  // ];

  
  return (
   <>
  <ul>
    <li><Link to='/profile'><button class="dropdown-item" type="button">My profile</button></Link></li>
    <li><Link to='/appointment'><button class="dropdown-item" type="button">My Appointments</button></Link></li>
    <li><Link to='/reviews'><button class="dropdown-item" type="button">My Reviews</button></Link></li>
    <li><Link to='/records'><button class="dropdown-item" type="button">My Medical Records</button></Link></li>
  </ul>


   
    <div className="main-component">
        
      {/* Search Bar 
      <div className="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary" data-mdb-ripple-init>search</button>*/}
  <input type="text" value={specialization} onChange={(e) =>setSpecialization(e.target.value)} placeholder="Enter Specialization"/>  &nbsp;<br/>
  <button onClick={handleSearch} className='btn btn-primary'>Search</button>
  {filteredDoctors.length>0?(
   
    <div>
       &nbsp;
      <ul>{filteredDoctors.map((doctor)=>(

<div key={doctor.id} className="doctor-card">
<img src={doc} alt={`${doctor.firstName} ${doctor.lastName}`} />
<h3>{doctor.firstName} {doctor.lastName}</h3>
<p>{doctor.specialization}</p>
<Link to="/appointment">Book Appointment</Link>
{/* <button onClick={() => bookAppointment(doctor.id)}></button> */}
</div>


        // <li key={doctor.doctorId}>
        //   <h3>
        //     {doctor.firstName}{doctor.lastName}
        //   </h3>
        //   <p>Specialization:{doctor.specialization}</p>
        // </li>
      ))}
      </ul>&nbsp;
      
      </div>):(<p>No doctors found...</p>)
  }

</div>

      {/* Banner */}
      <h3>Doctors</h3>
          <div className="doctors-cards">
            {/* Map through doctors data and render cards */}
            {doctors.slice(0, 6).map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <img src={doc} alt={`${doctor.firstName} ${doctor.lastName}`} />
                <h3>{doctor.firstName} {doctor.lastName}</h3>

                <p>{doctor.specialization}</p>
                <Link to="/appointment">Book Appointment</Link>
                {/* <button onClick={() => bookAppointment(doctor.id)}></button> */}
              </div>
            ))}
          </div>
      <h3>Speciality</h3>

      <div className="doctors-cards">
        {/* Map through doctors data and render cards */}
        {Speciality.map((speciality) => (
          <div key={speciality.id} className="doctor-card">
            <img src={speciality.imageUrl} alt={speciality.imageUrl} />
            <p>{speciality.specialty}</p>
          </div>
        ))}
      </div>&nbsp;
{/* <h3>Articles</h3> */}
      {/* <div className="doctors-cards">
        
        {Articles.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.imageUrl} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
          </div>
        ))}
      </div> */}
        
    
    
    </> 
  );
}

export default MainComponent;
