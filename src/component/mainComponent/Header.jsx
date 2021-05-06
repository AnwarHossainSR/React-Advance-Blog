import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState([]);
  const [count, setCount] = useState([]);

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        return <Redirect to="/auth/login"/>
      }
      const getUsers = async () => {
        const response = await axios
          .get("user")
          .catch((error) => console.log(error.resp));
          setCount(response.data.notifications);
          setUser(response.data.user);
      };
      getUsers();
    }, [])
    return (
      <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                to="/"
                role="button"
              >
                <i className="fas fa-bars" />
              </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a className="nav-link" data-toggle="dropdown" to="/">
                <i className="far fa-bell" />
                <span className="badge badge-danger navbar-badge">{count != '' ? count : 0}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span className="dropdown-item dropdown-header">
                  {count} Notifications
                </span>
                <div className="dropdown-divider" />
                <a to="" className="dropdown-item">
                  <i className="fas fa-envelope mr-2" /> 4 new messages
                  <span className="float-right text-muted text-sm">3 mins</span>
                </a>
                <div className="dropdown-divider" />
                <a to="/" className="dropdown-item">
                  <i className="fas fa-users mr-2" /> 8 friend requests
                  <span className="float-right text-muted text-sm">
                    12 hours
                  </span>
                </a>
                <div className="dropdown-divider" />
                <a to="/" className="dropdown-item">
                  <i className="fas fa-file mr-2" /> 3 new reports
                  <span className="float-right text-muted text-sm">2 days</span>
                </a>
                <div className="dropdown-divider" />
                <a to="/" className="dropdown-item dropdown-footer">
                  See All Notifications
                </a>
              </div>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to="/" onClick={() => localStorage.clear()}>
                    Logout
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
}

export default Header
