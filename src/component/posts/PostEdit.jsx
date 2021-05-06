import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const PostEdit = () => {

    const {id:eid}=useParams();
    const [categories, setCategories] = useState([]);
    const [tags,setTags]=useState([]);
    const [message,setMessage]=useState('');
    const [category, setCategory] = useState('');
    const [tag,setTag]=useState('');
    const [title, setTitle] = useState('');
    const [excerpt,setExcerpt]=useState('');
    const [content, setContent] = useState('');
    const [image,setImage]=useState('');
    const [categoryId,setCategoryId]=useState('');
    const [categoryName,setCategoryName]=useState('');
    const [tagId,setTagId]=useState('');
    const [tagName,setTagName]=useState('');
    
    useEffect(async () => {
        axios
        .get("posts/edit/"+eid)
        .then((response) => {
          setCategories(response.data.categories);
          setTags(response.data.tags);
          setTitle(response.data.post.title);
          setExcerpt(response.data.post.excerpt);
          setImage(response.data.post.postImage);
          setTag(response.data.tag);
          setCategoryId(response.data.categoryId);
          setCategoryName(response.data.categoryName);
          setTagId(response.data.tagId);
          setTagName(response.data.tagName);
          setContent(response.data.post.content);
        }).catch((err) => {
          setMessage( err.data );
        });
    },[])

    async function handleSubmit (e) {
       e.preventDefault();
       const data = {
        title: title,
        excerpt: excerpt,
        categories: category,
        tags: tag,
        content: content,
        postImage: image
      };
        axios
          .post("posts/update/"+eid, data)
          .then((response) => {
            if(response.data.message === 'Success'){
              Swal.fire("Success!", 'Post updated successfully', "success");
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
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Post Edit</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="" className="card-title">
                        <i className="fas fa-list nav-icon"></i>
                        Post List
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                  <h2 className="text-danger text-center">{message != '' ? message:''}</h2>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="exampleInputName">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={title}
                          onChange={(e)=>setTitle(e.target.value)}
                          placeholder="Write a title "
                        />
                      </div>
                      <div className="form-group">
                        <label>Excerpt</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={excerpt}
                          onChange={(e)=>setExcerpt(e.target.value)}
                          placeholder="Write excerpt "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="form-group">
                        <div className="form-line">
                          <label >Select Categorie</label>
                          <select
                            onChange={(e)=>setCategory(e.target.value)}
                            className="form-control"
                          >
                            <option defaultValue={categoryId}>{categoryName}</option>
                             {
                                categories.map((item, index) => (
                                <option value={item.id} key={index}>{item.name}</option>
                            ))} 
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-line">
                          <label>Select Tag</label>
                          <select onChange={(e)=>setTag(e.target.value)} className="form-control">
                          <option defaultValue={tagId}>{tagName}</option>
                          {tags.map((item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-1">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <div>
                        <div className="md-form">
                          <label>Content</label>
                          <textarea
                            onChange={(e)=>setContent(e.target.value)}
                            defaultValue={content}
                            className="md-textarea form-control"
                            rows='3'
                          />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Photo</label>
                            <input
                            type="file"
                            defaultValue={image}
                            onChange={(e)=>setImage(e.target.value[0])}
                            className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input
                            type="submit"
                            className="btn btn-primary" onClick={handleSubmit} value="Submit"
                            />
                        </div>
                      </div>
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

export default PostEdit
