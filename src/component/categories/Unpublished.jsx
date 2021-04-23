import React from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link } from 'react-router-dom'

const Unpublished = () => {
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
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                      <li class="breadcrumb-item "><Link to="/superadmin/category/manage">Category</Link></li>
                      <li class="breadcrumb-item active">Manage</li>
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
                              <th>Posts</th>
                              <th>Status</th>
                              <th>Image</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                              hv
                              </td>
                              <td>
                                cfgbvbg
                              </td>
                              <td>
                                cbv
                              </td>
                              <td>
                                cbgvb
                              </td>
                              <td>
                                <img
                                  src=""
                                  className="rounded-circle"
                                  alt="Category Image"
                                  width="100px"
                                  height="100px"
                                />
                              </td>
                              <td>
                                fgbcg
                              </td>
                            </tr>
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
    )
}

export default Unpublished
