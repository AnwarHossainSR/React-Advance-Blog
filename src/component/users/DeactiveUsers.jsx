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

const DeactiveUser = () => {
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
        .get("users/deactive")
        .catch((error) => console.log(error.resp));
        setData(response.data.users);
        setUserCount(response.data.count);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getUsers();
  }

  async function Active(id){
    await axios
        .get("change/active/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Activated!", "User has been Activated.", "success");
    getData();
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
              <h1 className="m-0">Total Active User : {userCount}</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item "><Link to="/superadmin/posts/manage">Posts</Link></li>
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
                        <th>Email</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            {item.active == true ? (
                              <li className="text-success">Active</li>
                            ) : (
                              <li className="text-danger">Deactive</li>
                            )}
                          </td>
                          <td>{item.type}</td>
                          <td>
                            <img
                              src={
                                "http://localhost:8000/source/back/profile/" + item.profileImage
                              }
                              width="120"
                              height="120"
                              className="rounded-circle"
                            />
                          </td>
                          <td>
                            <Link to={"/user/details/" + item.id} key={item.id}>
                              <i className="fa fa-info-circle text-primary" />
                            </Link>
                            
                            <i className="fas ml-2 fa-user-slash nav-icon text-danger" title="Click to Deactive" onClick={() => Active(item.id)} style={{ cursor:'pointer' }}/>
                          </td>
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

export default DeactiveUser
