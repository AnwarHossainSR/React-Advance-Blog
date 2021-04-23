import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'

import Manage from './component/categories/Manage'
import Create from './component/categories/Create'
import Dashboard from './component/mainComponent/Dashboard'
import Home from './component/mainComponent/Home'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Unpublished from './component/categories/Unpublished'
import Protected from './component/auth/Protrcted';


const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/auth/login"><Login /></Route>
        <Route exact path="/auth/registration"><Register /></Route>
        <Route exact path="/superadmin/dashboard"><Protected Cmp={Dashboard} /></Route>
        <Route exact path="/superadmin/category/manage"><Protected Cmp={Manage} /></Route>
        <Route exact path="/superadmin/category/unpublished"><Protected Cmp={Unpublished} /></Route>
        <Route exact path="/superadmin/category/create"><Protected Cmp={Create} /></Route>
      </BrowserRouter>
    </div>
  )
}

export default App
