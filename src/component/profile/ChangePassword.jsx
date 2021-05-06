import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const ChangePassword = () => {
  const [data, setData] = useState([]);
  const [comments, setUserCount] = useState(0);
  const [posts, setPostCount] = useState(0);
  const [message, setMessage] = useState('');
  const [previousPassword, setpreviousPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  var d = Date(data.created_at)
  var date = d.split(' ')
  data.joind = date[2]+' '+date[1]+', '+date[3];
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
        .get("/profile")
        .catch((error) => console.log(error.resp));
        setData(response.data.user);
        setUserCount(response.data.comments);
        setPostCount(response.data.posts);
    };
    getUsers();
  }

  async function handleSubmit(e){
    e.preventDefault();
        const data = {
          previousPassword: previousPassword,
          password: password,
          password_confirmation:cpassword,
        };
        axios
          .post("password/change", data)
          .then((response) => {
              if(response.data.message === 'Success'){
                Swal.fire("Success!", "Password has been changed.", "success");
                localStorage.clear();
                return <Redirect to="/auth/login"/>
              }else if(response.data.message === 'Cerror'){
                Swal.fire("Error!", "Current password is incorrect.", "error");
              }else{
                setMessage(response.data.message)
              }
          }).catch((err) => {
            Swal.fire("Error!", err.data.message, "error");
          });
  }
    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row ">
                <div className="col-3 ">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src={
                                "http://localhost:8000/source/back/profile/" + data.profileImage
                              }
                          alt="Admin"
                          className="rounded-circle"
                          width={100}
                        />
                        <div className="mt-3">
                          <h4>{data.name}</h4>
                          <p className="text-secondary mb-1"> {data.email}</p>
                          <hr/>
                          <div className="d-flex justify-content-around">
                            <p className="text-dark mb-1 text-bold">Total Post </p>
                            <p className="text-primary text-bold">{posts}</p>
                          </div>
                          <hr/>
                          <div className="d-flex justify-content-around">
                            <p className="text-dark mb-1 text-bold">Total Comment </p>
                            <p className="text-primary text-bold">{comments}</p>
                          </div>
                          <hr/>
                          <div className="d-flex justify-content-around">
                            <p className="text-dark mb-1 text-bold">Joind </p>
                            <p className="text-primary text-bold">{data.joind}</p>
                          </div>
                          <Link className="btn btn-outline-primary">
                            Message
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card mb-3">
                  <div>
                      {
                          message != ''? <h4 className="text-danger">{message}</h4>:''
                      }
                  </div>
                    <div className="p-1 px-3 d-flex justify-content-between">
                        <h3 className>Change Password</h3>
                    </div>

                    <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">Previous Password</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="password" className="form-control" onChange={(e)=>setpreviousPassword(e.target.value)} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">New Password</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">Confirm Password</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="password" className="form-control" onChange={(e)=>setCPassword(e.target.value)} />
                        </div>
                      </div>
                      <hr />
                      
                      <div className="row mt-3">
                        <div className="col-sm-12 text-primary">
                            <input type="submit" className="btn btn-primary" value="Update" />
                        </div>
                      </div>
                      </form>
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

export default ChangePassword
