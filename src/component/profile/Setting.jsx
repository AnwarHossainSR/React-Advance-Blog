import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const Setting = () => {
  const [message,setMessage]=useState('');
  const [data, setData] = useState([]);
  const [comments, setUserCount] = useState(0);
  const [posts, setPostCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [image, setImage] = useState('');
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
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setAbout(response.data.user.about);
        setImage(response.data.user.profileImage);
        setUserCount(response.data.comments);
        setPostCount(response.data.posts);
    };
    getUsers();
  }

  async function handleSubmit (e) {
    e.preventDefault();
    const data = {
     name: name,
     email: email,
     about: about,
     image: image
   };
     axios
       .post("profile/update", data)
       .then((response) => {
         if(response.data.message === 'Success'){
           Swal.fire("Success!", 'Profile updated successfully', "success");
         }else{
           setMessage(response.data.message)
         }
       }).catch((err) => {
         console.log( err.data );
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
                  <h2 className="text-danger text-center">{message != '' ? message:''}</h2>
                    <div className="p-1 px-3 d-flex justify-content-between">
                        <h3 className>Profile Edit</h3>
                        <h5>
                        <Link to="/password/change" className="nav-link">
                            <i className="nav-icon text-primary fas fa-unlock"></i>Change Password
                        </Link>
                        </h5>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">Full Name</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="text" name="name" defaultValue={name} className="form-control" onChange={(e)=>setName(e.target.value)} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">Email</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="text" name="name" defaultValue={email} className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">About</h6>
                        <div className="col-sm-12 text-secondary">
                            <textarea className="form-control" onChange={(e)=>setAbout(e.target.value)} cols="30" rows="5" defaultValue={about}></textarea>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <h6 className="mb-1 ml-2 text-bold">Photo</h6>
                        <div className="col-sm-12 text-secondary">
                            <input type="file" onChange={(e)=>setImage(e.target.value)} className="form-control" />
                        </div>
                      </div>
                      
                      <div className="row mt-3">
                        <div className="col-sm-12 text-primary">
                            <input type="submit" onClick={handleSubmit} className="btn btn-primary" value="Update" />
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

export default Setting
