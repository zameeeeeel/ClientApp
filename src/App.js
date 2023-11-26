import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar';
import { Footer } from './Components/Footer';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './Components/Register';
import MainComponent from './Components/Main';
import ProfileComponent from './Components/Profile';
import AppointmentComponent from './Components/Appointment';
import { useState } from 'react';
import Review from './Components/Review';
import { Banner } from './Components/Banner';
import  MedicalReportComponent from './Components/Records';
import { About } from './Components/About';

function App() {
  const[isLoggedIn,setLoggedIn]=useState(false);
  const[username,setUsername]=useState("");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} username={username} setLoggedIn={setLoggedIn} setUsername={setUsername} /> }>
          <Route path='Main' element={<MainComponent username={username} isLoggedIn={isLoggedIn} setUsername={setUsername} setLoggedIn={setLoggedIn} />} />
          <Route path="login" element={<Login isLoggedIn={isLoggedIn} username={username} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
          <Route path="register" element={<Register />}/>
          <Route path="profile" element={<ProfileComponent isLoggedIn={isLoggedIn} username={username} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
          <Route path="appointment" element={<AppointmentComponent isLoggedIn={isLoggedIn} username={username} setLoggedIn={setLoggedIn} setUsername={setUsername}/>}/>
          <Route path="reviews" element={<Review/>}/>
          <Route path="records" element={<MedicalReportComponent/>}/>
          <Route path="about" element={<About/>}/>
          <Route/>
        </Route> 
      </Routes>
      {/* <MainComponent/> */}
      
      <Banner/>
      <Footer/>
    </Router>
    // <Review/>
/* <AppointmentComponent/> */
    // <ProfileComponent/>
    
  );
}

export default App;
