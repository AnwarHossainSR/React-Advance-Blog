import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, Redirect, useParams } from 'react-router-dom'
import axios from "axios";
import Swal from "sweetalert2";


const RoleProvide = () => {
  const {id:eid}=useParams();
  const [data,setData]=useState([]);
  const [name,setName]=useState('');
  const [message,setMessage]=useState('');

  useEffect(async () => {
    axios
    .get("user/roles")
    .then((response) => {
      setData(response.data.roles);
    }).catch((err) => {
      setMessage( err.data );
    });
},[])
  async function handleSubmits(e) {
    e.preventDefault();
    const data = {
      roleName: name,
      id : eid
    };
    axios
      .post("role/create", data)
      .then((response) => {
        if(response.data.message === 'Success'){
          Swal.fire("Success!", 'Role provided', "success");
        }else{
          setMessage(response.data.message)
        }
      }).catch((err) => {
       console.log({ errors: err.data });
      });
  };
  console.log(name)
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
                  <h1 className="m-0">Role Change</h1>
                </div>
                <div className="col-sm-6">
                  <h1 className="m-0 float-md-right">
                    <Link to="/superadmin/category/manage">Category List</Link>
                  </h1>
                </div>
              </div>
            </div>
            <section className="content ">
              <div className="container-fluid">
                <div className="row ">
                  <div className="col-12 ">
                    <div className="card">
                      <h2 className="text-danger text-center">{message != '' ? message:''}</h2>
                        <div className="card-body">
                          <div className="form-group">
                            <label>Name</label>
                            <select
                            onChange={(e)=>setName(e.target.value)}
                            className="form-control"
                          >
                             {
                                data.map((item, index) => (
                                <option value={item.roleName} key={index}>{item.roleName}</option>
                            ))} 
                          </select>
                          </div>
                          <div className="card-footer">
                            <button type="submit" onClick={handleSubmits} className="btn btn-primary">
                              Submit
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

export default RoleProvide
