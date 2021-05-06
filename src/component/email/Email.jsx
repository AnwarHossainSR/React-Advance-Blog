import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import { Link, Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const Email = () => {
  const {id:eid}=useParams();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [subject,setSubject]=useState('');
  const [message,setMessage]=useState('');
  const [data, setData] = useState([]);
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
        .get("/useremail/show/"+eid)
        .catch((error) => console.log(error.resp));
        setData(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPostCount(response.data.posts);
    };
    getUsers();
  }
  async function handleSubmits(e) {
    e.preventDefault();
    axios
      .post("sendemail", {'subject':subject,'message':message,'email':email,'name':name})
      .then((response) => {
        Swal.fire("Sent!", response.data.message, "success");
      }).catch((err) => {
       console.log({ errors: err.data });
      });
  };
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
                        <div>
                            <div className="form-group">   
                                <label>Subject</label>
                                <input className="form-control" type="text" onChange={(e)=>setSubject(e.target.value)} placeholder="Write your subject" />
                                <label>Message</label>
                                <textarea type="text" className="form-control" placeholder="Write your message" onChange={(e)=>setMessage(e.target.value)} rows={4} />
                            </div>
                            <div>
                                <button type="submit" onClick={handleSubmits} className="btn btn-primary">Send</button>
                            </div>
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

export default Email
