import React,  { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";
//Jquery
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

const ManageRoles = () => {
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getUsers = async () => {
      const response = await axios
        .get("/role/manage")
        .catch((error) => console.log(error.resp));
        setData(response.data.roles);
        setUserCount(response.data.count);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getUsers();
  }


  return (
    <>
      <Header />
      <Sidebar />
      <div className="content-wrapper">

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2 ">
            <div className="col-sm-6">
              <h1 className="m-0">Total Roles : {userCount}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item "><Link to="/superadmin/users/active">Active Users</Link></li>
                  <li className="breadcrumb-item active">Manage</li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-12 ">
              <div className="card">
                <div className="card-header ">
                  <Link
                    to="/superadmin/role/create"
                    className="card-title float-right"
                  >
                    <i className="fas fa-plus-circle nav-icon" />
                    Add Roles
                  </Link>
                </div>
                <div className="card-body">
                  <table id="example1" className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.roleName}</td>
                          <td>{item.created_at}</td>
                          <td>{item.updated_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>   
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ManageRoles
