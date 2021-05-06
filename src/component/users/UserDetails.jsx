import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import { Link, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'

const UserDetails = () => {
    const {id:eid}=useParams();
    const [data, setData] = useState([]);
  const [comments, setUserCount] = useState(0);
  const [posts, setPostCount] = useState(0);
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
        .get("/users/show/"+eid)
        .catch((error) => console.log(error.resp));
        setData(response.data.user);
        setUserCount(response.data.comments);
        setPostCount(response.data.posts);
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
                          <p className="text-dark mb-1">Total Post : {posts}</p>
                          <p className="text-muted font-size-sm"></p>
                          <span className="text-success text-bold">Active</span>
                          <p />
                          <Link className="btn btn-outline-primary">
                            Message
                          </Link>
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
                              {
                                  data.active == 1 ? <li className="text-success">Active</li>:
                                  <li className="text-danger">Deactive</li>
                              }
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <h6 className="mb-0">User Type</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{data.type}</div>
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
                          <h6 className="mb-0">About</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">{data.about}</div>
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

export default UserDetails
