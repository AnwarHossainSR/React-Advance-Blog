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


const Comments = () => {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState([]);
  const [author, setAuthor] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getCategories = async () => {
      const response = await axios
        .get("comments")
        .catch((error) => console.log(error.resp));
        setData(response.data.comments);
        setPosts(response.data.posts);
        setCount(response.data.count);
        setAuthor(response.data.author);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getCategories();
  }
  
  async function deleteComment(id){
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
        .delete("comment/delete/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Deleted!", "Comment has been deleted.", "success");
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
                  <h1 className="m-0">Comments Page</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item "><Link to="/comments">Comments</Link></li>
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
                        <h3 className="card-title text-dark">Total Comment : {count}</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <table id="example1" className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Comment</th>
                              <th>Comment By</th>
                              <th>Post</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {data.map((item,index) => (
                            <tr key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.comment}</td>
                              <td>
                                <Link to={"/user/details/"+item.user_id} className="text-bold text-primary">{author[index]}</Link>
                              </td>
                              <td>
                                  <Link to={"/posts/singlepost/"+item.post_id} className="text-bold text-primary">{posts[index]}</Link>
                              </td>
                              <td>
                                <i className="fas ml-2 fa-trash-alt nav-icon text-danger" title="Click to hide category" onClick={() => deleteComment(item.id)} style={{ cursor:'pointer' }}/>
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

export default Comments
