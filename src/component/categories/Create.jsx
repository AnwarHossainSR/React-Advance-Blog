import React from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link } from 'react-router-dom'


const Create = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2 ">
                <div className="col-sm-6">
                  <h1 className="m-0">Category Generate</h1>
                </div>
                <div class="col-sm-6">
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
                      {/* /.card-header */}
                      {/* form start */}
                      <form
                        action="{{ route('category.store') }}"
                        method="POST"
                        encType="multipart/form-data"
                      >
                        <div className="card-body">
                          <div className="form-group">
                            <label htmlFor="exampleInputName">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              id="exampleInputName"
                              placeholder="Write a Category Name"
                            />
                          </div>
                          <div className="form-group-file">
                            <input
                              type="file"
                              name="feature_image"
                              accept="image/*"
                              id="file-upload"
                              className="form-control"
                            />
                          </div>
                          <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
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

export default Create
