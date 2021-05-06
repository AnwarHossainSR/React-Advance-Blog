import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import { Link, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const UserDetailsRequest = () => {
    const {id:eid}=useParams();
    const [data, setData] = useState([]);
    const [message,setMessage]=useState('');
    const [umessage,setUmessage]=useState('');
    
  const [comments, setUserCount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  async function acceptRequest(id){
    axios
    .get("user/request/accept/"+id)
    .then((response) => {
      if(response.data.message === 'Success'){
        Swal.fire("Success!", 'Request accepted successfully', "success");
      }else{
        setMessage(response.data.message)
      }
    }).catch((err) => {
      console.log( err.data );
    });
    getData();
  }

  async function cancellRequest(id){
    axios
    .get("user/request/cancell/"+id)
    .then((response) => {
      if(response.data.message === 'Success'){
        Swal.fire("Success!", 'Request cancelled', "success");
      }else{
        setMessage(response.data.message)
      }
    }).catch((err) => {
      console.log( err.data );
    });
    getData();
  }

  
  //Get Data
  async function getData() {
    
    const getUsers = async () => {
      const response = await axios
        .get("user/request/show/"+eid)
        .catch((error) => console.log(error.resp));
        setData(response.data.user);
        setUserCount(response.data.comments);
        setUmessage(response.data.umessage);
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
              <div className="row ">
                <div className="col-4 ">
                  <div className="card">
                  <h2 className="text-danger text-center">{message != '' ? message:''}</h2>
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={
                                "http://localhost:8000/source/back/profile/" + data.profileImage
                              }
                          alt="Admin"
                          className="rounded-circle"
                          width={150}
                        />
                        <div className="mt-3">
                          <h4>{data.name}</h4>
                          <p className="text-dark mb-1">Total comment : {comments}</p>
                          <p className="text-muted font-size-sm"></p>
                          <span className="text-success text-bold">Active</span>
                          <p />
                          <li className="btn btn-outline-primary" onClick={() => acceptRequest(data.id)}>
                            Accept
                          </li>
                          <li className="btn btn-outline-danger ml2" onClick={() => cancellRequest(data.id)}>
                            Cancell
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Full Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{data.name}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Email</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{data.email}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Status</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <li className="text-success">{data.type}</li>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">User Type</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{data.reqType}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Total Comments</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{comments}</div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">Message</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{umessage}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
}

export default UserDetailsRequest
