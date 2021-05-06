import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Redirect,Link } from 'react-router-dom'
import axios from 'axios'


const Main = (props) => {
  const [data,setData] = useState([])
  const [author_name,setName] = useState('')
  const [admin,setAdmin] = useState(0)
  const [user,setUser] = useState(0)
  const [author,setAuthor] = useState(0)
  const [posts,setPosts] = useState(0)
  const [pending,setPending] = useState(0)
  const [view,setView] = useState(0)
  const [today,setToday] = useState(0)
  const [categories,setCategories] = useState(0)


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/auth/login"/>
    }
    getData();
  }, []);

  
  //Get Data
  async function getData() {
    
    const getData = async () => {
      const response = await axios
        .get("/dashboard")
        .catch((error) => console.log(error.resp));
        setData(response.data.popular);
        setAdmin(response.data.admin);
        setUser(response.data.user);
        setAuthor(response.data.author);
        setPosts(response.data.posts);
        setPending(response.data.pending);
        setView(response.data.view);
        setToday(response.data.today);
        setCategories(response.data.categories);
        setName(response.data.author_name);
    };
    getData();
  }
    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Dashboard</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a to="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-info">
                    <div className="inner">
                      <h3>{posts}</h3>
                      <p>Total Post</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-success">
                    <div className="inner">
                      <h3>
                        {view}
                      </h3>
                      <p>Total View</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{pending}</h3>
                      <p>Pending Post</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-danger">
                    <div className="inner">
                      <h3>{author }</h3>
                      <p>Total Author</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-orange">
                    <div className="inner">
                      <h3>{ admin }</h3>
                      <p>Total Admin</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-pink">
                    <div className="inner">
                      <h3>{ user }</h3>
                      <p>Total User</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-purple">
                    <div className="inner">
                      <h3>{ today }</h3>
                      <p>Today registered user</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-6">
                  <div className="small-box bg-secondary">
                    <div className="inner">
                      <h3>{ categories }</h3>
                      <p>Total Categories</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-pie-graph" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-secondary text-center">
                      <h1>Most Popular Post</h1>
                    </div>
                    <div className="card-body">
                    <table id="example1" className="table table-hover">
                    <thead className="table-light">
                      <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Views</th>
                      <th>Favorite</th>
                      <th>Comments</th>
                      <th>Status</th>
                      <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.title}</td>
                          <td>{author_name[index]}</td>
                          <td>{item.view_count}</td>
                          <td>{item.favorite_to_users_count}</td>
                          <td>{ item.comments_count }</td>
                          <td>{item.status === 'Publish' ? <li className="text-success">Published</li>:<li className="text-warning">Unpublished</li>}</td>
                          <td>
                            <Link to={"/post/details/" + item.id} key={item.id}>
                              <i className="fas fa-info-circle nav-icony" />
                            </Link>
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
}

export default Main
