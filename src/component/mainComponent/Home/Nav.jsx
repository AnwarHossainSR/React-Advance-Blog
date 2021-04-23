import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  
    return (
        <>
           <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ">
              <li className="nav-item active">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              {
                localStorage.getItem("token")?(
                  <>
                    <li className="nav-item active">
                      <Link className="nav-link text-white" to="/superadmin/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    {/* <li className="nav-item active">
                      <Link className="nav-link text-white" to="/" onClick={() => localStorage.clear()}>
                        Logout
                      </Link>
                    </li> */}
                  </>
                ):(
                  <>
                  <li className="nav-item active">
                    <Link className="nav-link text-white" to="/auth/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link text-white" to="/auth/registration">
                      Registration
                    </Link>
                  </li>
                  </>
                )
              }
              
            </ul>
          </div>
        </nav> 
        </>
    )
}

export default Nav
