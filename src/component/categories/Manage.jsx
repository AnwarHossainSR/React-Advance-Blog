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
        .get("categories")
        .catch((error) => console.log(error.resp));
        setData(response.data.categories);
        $(document).ready(function () {
          $("#example1").DataTable();
        });
    };
    getCategories();
  }

  
  
  async function categoryHide(id){
    await axios
        .get("category/hide/"+id)
        .catch((error) => console.log(error.resp));
    Swal.fire("Archived!", "Category has been archived.", "success");
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
                  <h1 className="m-0">Category Page</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item "><Link to="/superadmin/category/manage">Category</Link></li>
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
                        <h3 className="card-title text-dark">Categories</h3>
                        <Link
                          to="/superadmin/category/create"
                          className="card-title float-right"
                        >
                          <i className="fas fa-plus-circle nav-icon" />
                          Add Category
                        </Link>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <table id="example1" className="table table-hover">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Slug</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {data.map((item,index) => (
                            <tr key={item.id}>
                              <td>{index+1}</td>
                              <td>{item.name}</td>
                              <td>{item.slug}</td>
                              <td>
                                {
                                  item.status == 0 ? <li className="text-danger" style={{ cursor:'pointer' }}>Unpublish</li> :<li className="text-success" style={{ cursor:'pointer' }}>Publish</li>
                                }
                              </td>
                              <td>
                                <img
                                  src={"http://localhost:8000/source/back/category/"+item.image}
                                  width="120"
                                  height="120"
                                  className="rounded-circle"
                                />
                              </td>
                              <td>
                                <Link to={"/superadmin/category/update/"+item.id} key={item.id}>
                                  <i className="fa fa-edit text-primary"/>
                                </Link>
                                <i className="fas ml-2 fa-arrow-up nav-icon text-success" title="Click to hide category" onClick={() => categoryHide(item.id)} style={{ cursor:'pointer' }}/>
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

export default Manage
