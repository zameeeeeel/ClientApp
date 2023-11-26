
import { useState, useEffect } from 'react';
// import './App.css';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Login(props) {



    const [email, setEmail] = useState({ Email: "", error: "" });
    const [password, setPassword] = useState({ Password: "", error: "" });
    const [role, setRole] = useState({ Role: 0, error: "" });
    const [authenticationError, setError] = useState("");
    const [users, setUsers] = useState({});
    const[username,setUserName]=useState(0);
    const navigate = useNavigate();
//Function to handle email
    const handleEmailChange = (event) => {
        const value = event.target.value;
        if (value == "") {
            setEmail({ Email: "", error: "Email is Required" })
        }
        else {
            
            setEmail({ Email: value, error: "" })
        }

    }
//Function to handle password
    const handlePasswordChange = (event) => {
        const value = event.target.value;
        if (value == "") {
            setPassword({ Password: "", error: "Password is Required" })
        }
        else {
            setPassword({ Password: value, error: "" })
        }
    }
//Function to handle role
    const handleRole = (event) => {
        const value = parseInt(event.target.value);
        if (value == "") {
            setRole({ Role: 0, error: "Role is Required" })
        }
        else {
            setRole({ Role: value, error: "" })
        }
    }
//Function to handle login
    async function handleLogin() {
        const user = {
            userName: email.Email,
            password: password.Password,
            role: role.Role
        };
        
        await fetch("http://localhost:5159/api/User/Login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user),
        }
        ).then((response) => {
            if (response.status == 400) {
                setError("Bad request");
                throw "Bad request";
            }
            if (response.status == 401) {
                setError("Invalid Username Or Password");
                throw "Invalid";
            }
            return response.json();
        }).then((result) => {
                setUserName(result.userName);
                console.log(result);
                props.setLoggedIn(true);
                // console.log(isLoggedIn);
                sessionStorage.setItem('username', result.userName);
                
                navigate('/Main');
                //alert("OK");
                alert("Login Successfull")
            }).catch((err)=>{
                alert("Invalid Username or password")
                setError("Invalid Username or password");
            });
    }
    return (
        <div className='container'>
            <div className='w-50 mt-5 mx-auto'>
                <h2>Let's get started by login</h2>
                <div className='errors'>
                    <p>Fields marked with * are mandatory</p>
                    {email.error !== "" && <li>{email.error}</li>}
                    {password.error !== "" && <li>{password.error}</li>}
                    {authenticationError !== "" && <li>{authenticationError}</li>}
                </div>
                <div className='form-group mt-2'>
                    <p>Email Address<span>*</span></p>
                    <input className='form-control' type="email" value={email.Email} name='Email' onChange={handleEmailChange} required />
                </div>
                <div className='form-group mt-2'>
                    <p>Password<span>*</span></p>
                    <input className='form-control' type="password" value={password.Password} name='Password' onChange={handlePasswordChange} required />
                </div>
                <div className='form-group mt-2'>
                    <p>Role<span>*</span></p>
                    <input className='form-control' type="role" value={role.Role} name='Role' onChange={handleRole} required />
                </div>&nbsp;
                {}
                <div className='mt-2'>
                    <button className='btn btn-primary' onClick={handleLogin} >Submit</button>
                </div>&nbsp;
                <div className="d-flex align-items-center">
          <Link to="/register" className="btn btn-primary">
          Not Registered? Register
          </Link>
        </div>
                <p>{authenticationError}</p>
            </div>
        </div>
    );
}

