import React from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'

const Create = () => {
    return (
      <>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
          <h1>Create</h1>
        </div>
        <Footer />
      </>
    );
}

export default Create
