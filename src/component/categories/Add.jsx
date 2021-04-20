import React from 'react'
import Header from '../mainComponent/Header'
import Sidebar from '../mainComponent/Sidebar'
import Footer from '../mainComponent/Footer'

const Add = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                <h1>Manage</h1>
            </div>
            <Footer />
        </>
    )
}

export default Add
