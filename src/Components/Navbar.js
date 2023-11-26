import { Link, Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
import B1 from '../Images/logo.png'
import { Navigate } from "react-router-dom";
//Function to navigate to other pages by username
export function Navbar(props){
  const navigate= useNavigate();
  const handleLogout=()=>{
    sessionStorage.removeItem("username");
    props.setLoggedIn(false);
    navigate("/login");
    
  }

  console.log(props)
  
    return(
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  
  <div class="container-fluid">
    
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>

    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      
      <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={B1}
          height="40"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
      <Link to='/'><a>MED MATRIX</a></Link>
      
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
          <Link to='/Main'><a class="nav-link">Home</a></Link>
        </li>
        <li class="nav-item">
      <Link to='/about'> <a class="nav-link" >About Us</a></Link>
        </li>
        
      
                
      </ul>
      
    </div>
    
    
    {/* <div class="d-flex align-items-center">
    
    <button type="button" class="btn btn-primary" >Login/Register</button>
    </div> */}
 { !props.isLoggedIn && (
    <div className="d-flex align-items-center">
          {/* Use Link for navigation to the Login component */}
         
          <Link to="/login" className="btn btn-primary">
            Login/Register
          </Link>
          </div>
          )}
   {props.isLoggedIn && (
             <div className="d-flex align-items-center">
            <b>Welcome, {sessionStorage.getItem("username")}</b>
            &nbsp;
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          )}
  </div>
</nav>
&nbsp;
<Outlet/>
        </>
    )
}