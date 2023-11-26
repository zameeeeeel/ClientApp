import { Link } from 'react-router-dom'
import B1 from '../Images/logo.png'
export function Footer(){
    return(
   <> 
   &nbsp;    
<footer className="text-center text-lg-start bg-light text-muted">
  
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>MedMatrix</span>
        </div>
        <div>
          {/*<a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
    </a>*/}
          {/* Add other social media links with icons */}
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
              <a class="navbar-brand mt-2 mt-lg-0" href="#">
        <img
          src={B1}
          height="40"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
    
              </h6>
             
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Details
              </h6>
              <p>
                <a href="#!" className="text-reset">Doctors</a><br/>
                <a href="#!" className="text-reset">Appointment</a><br/>
                <a href="#!" className="text-reset">Reviews</a><br/>
                <a href="#!" className="text-reset">Hospitals</a><br/>
              </p>
              {/* Add other product links */}
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <Link to='/login'><a href="#!" className="text-reset">Login</a></Link><br/>
                <Link to='/appointment'><a href="#!" className="text-reset">Appointment</a></Link>
              </p>
              {/* Add other useful links */}
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> +91 5678912345</p>
              {/* Add other contact information */}
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright:
        <a className="text-reset fw-bold" href="#">medmatrix.com</a>
      </div>
    </footer>
</>
    )
}