import React, { useState } from 'react';
import './ProfileComponent.css'; // Import CSS file for styling

function ProfileComponent(props) {
  
  const [firstName, setfirstName] = useState({ FirstName: "", error: "" });
  const [lastName, setlastName] = useState({ LastName: "", error: "" });
  const [gender, setgender] = useState({ Gender: 0, error: "" });
  const [dateOfBirth, setdateOfBirth] = useState({ DateOfBirth: new Date(), error: "" });
  const [mobileNo, setmobileNo] = useState({ MobileNo: "", error: "" });
  const [address, setaddress] = useState({ Address: "", error: "" });
  const [ailment, setailment] = useState({ Ailment: "", error: "" });
  const[saved,setSaved]=useState(0);

//Function to handle firstname
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    if (value == "") {
        setfirstName({ FirstName: "", error: "FirstName is Required" })
    }
    else {
        setfirstName({ FirstName: value, error: "" })
    }
}
//Function to handle lastname
const handleLastNameChange = (event) => {
  const value = event.target.value;
  if (value == "") {
      setlastName({ LastName: "", error: "LastName is Required" })
  }
  else {
      setlastName({ LastName: value, error: "" })
  }
}
//Function to handle gender
const handleGenderChange = (event) => {
  const value = parseInt(event.target.value);
  if (value == "") {
      setgender({ Gender: 0, error: "Gender is Required" })
  }
  else {
      setgender({ Gender: value, error: "" })
  }
}
//Function to handle date of birth
const handleDateOfBirthChange = (event) => {
  const value = event.target.value;
  if (value == null) {
      setdateOfBirth({ DateOfBirth: new Date(), error: "DateOfBirth is Required" })
  }
  else {
      setdateOfBirth({ DateOfBirth: value, error: "" })
  }
}
//Function to handle mobile number
const handleMobileNoChange = (event) => {
  const value = event.target.value;
  if (value == "") {
    setmobileNo({ MobileNo: "", error: "MobileNo is Required" })
  }
  else {
    setmobileNo({ MobileNo: value, error: "" })
  }
}
//Function to handle address
const handleAddressChange = (event) => {
  const value = event.target.value;
  if (value == "") {
      setaddress({ Address: "", error: "Address is Required" })
  }
  else {
    setaddress({ Address: value, error: "" })
  }
}
//Function to handle ailment
const handleAilmentChange = (event) => {
  const value = event.target.value;
  if (value == "") {
      setailment({ Ailment: "", error: "Ailment is Required" })
  }
  else {
    setailment({ Ailment: value, error: "" })
  }
}
//Function to Update doctor profile
  const handleUpdateProfile = () => {
    console.log(sessionStorage.getItem("username"));
  const profile= {
    userName: sessionStorage.getItem("username"),
    firstName: firstName.FirstName,
    lastName: lastName.LastName,
    gender: gender.Gender,
    dateOfBirth: dateOfBirth.DateOfBirth,
    mobileNo: mobileNo.MobileNo,
    address: address.Address,
    ailment: ailment.Ailment,
  };
    fetch("http://localhost:5159/api/Patient/" + profile.userName, {
    method: 'PUT',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(profile)
}).then(result => result.json()).then(result => {
    alert("Patient details updated");
    setSaved(result);
});
  };
//Function to Create a doctor profile
const handleCreateProfile=(event)=>{
  event.preventDefault();
  
  const profile= {
    userName: sessionStorage.getItem("username"),
    firstName: firstName.FirstName,
    lastName: lastName.LastName,
    gender: gender.Gender,
    dateOfBirth: dateOfBirth.DateOfBirth,
    mobileNo: mobileNo.MobileNo,
    address: address.Address,
    ailment: ailment.Ailment,
  };
  console.log(profile);
fetch("http://localhost:5159/api/Patient", {
     method: 'POST',
     headers:{'Content-Type': 'application/json'},
     body: JSON.stringify(profile)
 }).then(result => result.json()).then(result => {
     alert("User Added");
     
     setSaved(result);
 });
}


  return (
    <div className="profile-container">
      
      <h2>Update Profile</h2>
      <div className="profile-form">
        {/* <div className="form-group">
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={profile.userName}
            onChange={handleInputChange}
            maxLength={30}
          />
        </div> */}

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName.FirstName}
            onChange={handleFirstNameChange}
            maxLength={10}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
          
            type="text"
            name="lastName"
            value={lastName.LastName}
            onChange={handleLastNameChange}
            maxLength={10}
          />
        </div>

        <div className="form-group">
     <label>Gender:</label>
     <select name='gender' value={gender.Gender} onChange={handleGenderChange}>
         <option value="0">Male</option>
         <option value="1">Female</option>
         <option value="2">Other</option>
     </select>
 </div>

 <div className="form-group">
     <label>Mobile No:</label>
     <input
     name='mobileNo'
         type="text"
         value={mobileNo.MobileNo}
         onChange={handleMobileNoChange}
     />
 </div>
 <div className="form-group">
     <label>Address:</label>
     <input
     name='address'
     type='text'
         value={address.Address}
         onChange={handleAddressChange}
    / >
 </div>
 <div className="form-group">
     <label>Date of Birth:</label>
     <input
         type="datetime-local"
         name='dateOfBirth'
         value={dateOfBirth.DateOfBirth}
         onChange={handleDateOfBirthChange}
     />
 </div>
 <div className="form-group">
     <label>Ailment:</label>
     <input
         type="text"
         name='ailment'
         value={ailment.Ailment}
         onChange={handleAilmentChange}
     />
 </div>

        {/* Add other input fields for the remaining profile properties similarly */}

        
      </div>

      <button className="update-button" onClick={handleUpdateProfile}>
        Update Profile
      </button>
      &nbsp;
      <button className="update-button" onClick={handleCreateProfile}>
        Create
      </button>
    </div>
  );
}

export default ProfileComponent;
