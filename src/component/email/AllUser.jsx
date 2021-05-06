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


const AllUser = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getSubscriber = async () => {
      const response = await axios
        .get("allusers")
        .catch((error) => console.log(error.resp));
        setData(response.data.users);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getSubscriber();
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
                            <Link to={"/user/email/" + item.id} key={item.id}>
                              <i className="far fa-envelope text-primary mr-2" />
                            </Link>
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
}

export default AllUser
