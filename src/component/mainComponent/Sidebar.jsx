import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
      <>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          <Link to="" className="brand-link">
            <img
              src={process.env.PUBLIC_URL+"/dist/img/AdminLTELogo.png"}
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: ".8" }}
            />
            <span className="brand-text font-weight-light">Super Admin</span>
          </Link>
          <div className="sidebar">
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src={process.env.PUBLIC_URL+"/dist/img/user2-160x160.jpg"}
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div className="info">
                <Link to="#" className="d-block">
                  Anwar Hossain
                </Link>
              </div>
            </div>
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item">
                  <Link to="/superadmin/dashboard" className="nav-link">
                    <i className="nav-icon text-primary fas fa-th"></i>
                    <p>
                      Dashboard
                    </p>
                  </Link>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link">
                  <i className="nav-icon text-primary fab fa-affiliatetheme"></i>
                    <p>
                      Category management
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link ">
                  <i class="nav-icon text-primary fab fa-usps text-primary"></i>
                    <p>
                      Post management
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link ">
                  <i class="nav-icon text-primary fas fa-users"></i>
                    <p>
                      User management
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link ">
                  <i class="nav-icon text-primary fas fa-comment"></i>
                    <p>
                      Comments
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link ">
                  <i class="nav-icon text-primary fas fa-envelope-open"></i>
                    <p>
                      Emailing
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item has-treeview">
                  <Link to="/superadmin/category/manage" className="nav-link ">
                  <i class="nav-icon text-primary fas fa-subscript"></i>
                    <p>
                      Subscriber Manage
                      <i className="right fas fa-angle-left" />
                    </p>
                  </Link>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/manage"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Manage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/superadmin/category/unpublished"
                        className="nav-link"
                      >
                        <i className="far fa-circle nav-icon text-warning"></i>
                        <p>Unpublished Category</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/superadmin/dashboard" className="nav-link">
                  <i class="nav-icon text-primary far fa-bell"></i>
                    <p>
                      Notification
                      <span class="right badge badge-danger">0</span>
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/superadmin/dashboard" className="nav-link">
                  <i class="nav-icon text-primary fas fa-user-cog"></i>
                    <p>
                      Settings
                    </p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" onClick={() => localStorage.clear()} className="nav-link">
                    <i className="nav-icon text-danger fas fa-sign-out-alt"></i>
                    <p>
                      Logout
                    </p>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>
      </>
    );
}

export default Sidebar
