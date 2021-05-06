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

const Manage = () => {
  const [data, setData] = useState([]);
  const [postsCount, setPostCount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getPosts = async () => {
      const response = await axios
        .get("deleted/posts")
        .catch((error) => console.log(error.resp));
        setData(response.data.posts);
        setPostCount(response.data.count);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getPosts();
  }


  async function postRestore(id){
    await axios
        .get("deleted/post/restore/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Restored!", "Post has been restored.", "success");
    getData();
  }
  async function deletePost(id){
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
        .delete("post/delete/permanent/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Deleted!", "Your post has been deleted.", "success");
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
              <h1 className="m-0">Total Post : {postsCount}</h1>
            </div>
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
                <div className="card-header ">
                  <Link
                    to="/superadmin/category/create"
                    className="card-title float-left btn btn-success"
                  >
                    <i className="fas fa-plus-circle nav-icon" />
                    Create Post
                  </Link>
                  <Link
                    to="/superadmin/posts/trash"
                    className="card-title float-right btn btn-danger"
                  >
                    <i className="fas fa-trash-alt nav-icon" />
                    Trash Post
                  </Link>
                </div>
                <div className="card-body">
                  <table id="example1" className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>View</th>
                        <th>isApproved</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{item.view_count}</td>
                          <td>
                            {item.is_approve == true ? (
                              <li className="badge bg-blue">Approved</li>
                            ) : (
                              <li className="badge bg-pink">Pending</li>
                            )}
                          </td>
                          <td>
                            {item.status == 'Unpublish' ? (
                              <li className="text-danger">Unpublished</li>
                            ) : (
                              <li className="text-success">Published</li>
                            )}
                          </td>
                          <td>
                            <img
                              src={
                                "http://localhost:8000/source/back/post/" + item.postImage
                              }
                              width="120"
                              height="120"
                              className="rounded-circle"
                            />
                          </td>
                          <td>
                            <i className="ml-2 fa fa-trash-alt text-danger mr-2" onClick={() => deletePost(item.id)}  style={{ cursor:'pointer' }}/>
                            <i className="fas ml-2 fa-reply nav-icon text-success" onClick={() => postRestore(item.id)} style={{ cursor:'pointer' }}/>
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
};

export default Manage
