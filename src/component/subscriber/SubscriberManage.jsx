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


const SubscriberManage = () => {
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
        .get("subscribers")
        .catch((error) => console.log(error.resp));
        setData(response.data.subscribers);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getSubscriber();
  }

  async function subscriberDelete(id){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        successMessage(id);
      }
    });
  }

  async function successMessage(id) {
    await axios
        .delete("subscriber/delete/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Deleted!", "Subscriber has been deleted.", "success");
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
                  <h1 className="m-0">Subscriber Page</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item "><Link to="/superadmin/subscriber/manage">Subscribers</Link></li>
                      <li className="breadcrumb-item active">Manage</li>
                  </ol>
              </div>
              </div>
            </div>
            <section className="content ">
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-12 ">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title text-dark">Subscribers</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <table id="example1" className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Email</th>
                              <th>Created At</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {data.map((item,index) => (
                            <tr key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.email}</td>
                              <td>{item.created_at}</td>
                              <td>
                                <i className="fas ml-2 fa-trash-alt nav-icon text-danger" title="Click to delete subscriber" onClick={() => subscriberDelete(item.id)} style={{ cursor:'pointer' }}/>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </section>
          </section>
        </div>

        <Footer />
      </>
    );
}

export default SubscriberManage
