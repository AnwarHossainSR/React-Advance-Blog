import React, { useEffect, useState } from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";


const CategoryEdit = () => {

    const {id:eid}=useParams();
    const [data, setData] = useState({});
    const [message,setMessage]=useState('');
    const [name,setName]=useState('');
    const [image,setImage]=useState('');

    useEffect(async () => {
        axios
        .get("category/edit/"+eid)
        .then((response) => {
          setData(response.data.category);
          setName(response.data.category.name);
          setImage(response.data.category.image);
        }).catch((err) => {
          setMessage( err.data );
        });
    },[])

    async function handleSubmits (e) {
       e.preventDefault();
        const data = {
          name: name,
          image: image
        };
        axios
          .post("category/update/"+eid, data)
          .then((response) => {
            if(response.data.message === 'Success'){
              Swal.fire("Success!", 'Category updated successfully', "success");
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
                <div className="row mb-2 ">
                    <div className="col-sm-6">
                    <h1 className="m-0">Category Edit</h1>
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
                        <form
                            onSubmit={handleSubmits}
                            encType="multipart/form-data"
                        >
                            <div className="card-body">
                            <div className="form-group">
                                <label >Name</label>
                                <input
                                type="text"
                                className="form-control"
                                name="name"
                                defaultValue={name} onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group-file">
                                <input
                                type="file"
                                name="feature_image"
                                accept="image/*"
                                defaultValue={image} onChange={(e)=>setImage(e.target.value[0])}
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
                    </div>
                    </div>
                </div>
                </section>
            </section>
            </div>

            <Footer /> 
        </>
    )
}

export default CategoryEdit
