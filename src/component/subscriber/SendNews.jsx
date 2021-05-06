import React, { useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";

const SendNews = () => {
  
  const [subject,setSubject]=useState('');
  const [message,setMessage]=useState('');

  async function handleSubmits(e) {
    e.preventDefault();
    axios
      .post("sendnews", {'subject':subject,'message':message})
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
      }).catch((err) => {
       console.log({ errors: err.data });
      });
  };
  if (!localStorage.getItem('token')) {
    return <Redirect to="/auth/login"/>
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
                  <h1 className="m-0">Send News</h1>
                </div>
                <div className="col-sm-6">
                  <h1 className="m-0 float-md-right">
                    <Link to="/superadmin/subscriber/manage">Subscriber List</Link>
                  </h1>
                </div>
              </div>
            </div>
            <section className="content ">
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-12 ">
                    <div className="card">
                      
                        <div className="card-body">
                          <div className="form-group">
                            <label >Subscriber</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Write your subject"
                              onChange={(e)=>setSubject(e.target.value)} 
                            />
                          </div>
                          <div className="form-group">
                            <label >Message</label>
                            <textarea className="form-control" cols="30" rows="10" placeholder="Write your message"
                              onChange={(e)=>setMessage(e.target.value)} ></textarea>
                          </div>
                          <div className="card-footer">
                            <button type="submit" onClick={handleSubmits} className="btn btn-primary">
                              Send
                            </button>
                          </div>
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

export default SendNews
