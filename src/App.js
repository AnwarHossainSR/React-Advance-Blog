import React from 'react'
import Header from './component/mainComponent/Header'
import Sidebar from './component/mainComponent/Sidebar'
import Main from './component/mainComponent/Dashboard'
import Footer from './component/mainComponent/Footer'

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  )
}

export default App
