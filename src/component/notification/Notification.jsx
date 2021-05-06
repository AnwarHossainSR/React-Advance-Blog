import React,  { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const Comments = () => {
  const [notifications, setData] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getNotifications = async () => {
      const response = await axios
        .get("notifications")
        .catch((error) => console.log(error.resp));
        setData(response.data.notifications);
    };
    getNotifications();
  }
  async function markAllRead() {
    
    await axios
        .get("notifications/readall")
        .catch((error) => console.log(error.resp));
        Swal.fire("success!", "All notification marked as read successfully", "success");
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
                  <h1 className="m-0">Notification Page</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item "><Link to="/comments">Notification</Link></li>
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
                        <h3 className="card-title text-primary text-bold">Total Notification : {notifications.length}</h3>
                        <h4 className="text-secondary float-right" onClick={markAllRead}><i className="far fa-eye text-success" title="Click to mark all as read" style={{ cursor:'pointer' }} /></h4>
                      </div>
                      <div className="card-body">
                          {notifications.map((item) => (
                              item.type === "App\\Notifications\\superAdmin\\NewPostNotification" ?
                                <>
                                    <div class="alert alert-default-success alert-dismissible fade show" role="alert">
                                        <strong>New Post Notification!</strong> 
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                            </>:''

                          ))}
                          {notifications.map((item) => (
                              item.type === "App\\Notifications\\superAdmin\\NewUserNotification" ?
                                <>
                                    <div class="alert alert-default-warning alert-dismissible fade show" role="alert">
                                        <strong>New User Registered!</strong> 
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                            </>:''

                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        </div>

        <Footer />
      </>
    );
}

export default Comments
