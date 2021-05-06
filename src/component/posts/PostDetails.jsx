import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import HTMLReactParserOptions from 'html-react-parser';


const PostDetails = () => {

    const {id:eid}=useParams();
    const [post, setPost] = useState([]);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    var d = Date(post.created_at)
    var date = d.split(' ')
    post.posted = date[2]+' '+date[1]+', '+date[3];
    
    
    useEffect(async () => {
        axios
        .get("posts/details/"+eid)
        .then((response) => {
          setPost(response.data.post);
          setContent(response.data.content);
          setCategory(response.data.category);
          setTag(response.data.tag);
        }).catch((err) => {
          console.log( err.data );
        });
    },[])

    return (
        <>
           <Header />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Post Details</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <Link to="/superadmin/posts/manage" className="card-title">
                        <i className="fas fa-list nav-icon"></i>
                        Post List
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="card-header">
                        <div >
                            <h2>{ post.title }</h2>
                            <small>Posted By : <strong>
                                    <Link to="/">
                                        { post.title }
                                    </Link> on {post.posted}
                                </strong>
                                
                            </small>
                        </div>
                        <div className="float-right" style={{marginTop:'-25px'}}>
                            {
                                post.is_approve == true ? <li className="fas fa-check badge bg-blue p-2">Approved</li> : <li className="badge bg-pink p-2">Pending</li>
                            }

                            {
                                post.status === 'Publish' ? <li className="fas ml-1 fa-check badge bg-orange p-2">Published</li> : <li className="badge ml-1 bg-purple p-2">Unpublished</li>
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        {content}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-primary">
                        Categorie
                    </div>
                    <div className="card-body">
                    <span className="badge bg-primary">{category}</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header bg-success">
                        Tag
                    </div>
                    <div className="card-body">
                        <span className="badge bg-green">{tag}</span>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-header bg-secondary">
                        Feature Image
                    </div>
                    <div className="card-body">
                        <img src={"http://localhost:8000/source/back/post/" + post.postImage} alt="Feature Image" srcSet width="100%" height="100%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer /> 
        </>
    )
}

export default PostDetails
