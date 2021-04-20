import React from 'react'
import { BrowserRouter,Route } from 'react-router-dom'

import Manage from './component/categories/Manage'
import Create from './component/categories/Create'
import Dashboard from './component/mainComponent/Dashboard'
import Home from './component/mainComponent/Home'
import Login from './component/auth/Login'
import Register from './component/auth/Register'

const App = () => {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/auth/login"><Login /></Route>
        <Route exact path="/auth/registration"><Register /></Route>
        <Route exact path="/superadmin/dashboard"><Dashboard /></Route>
        <Route exact path="/superadmin/category/manage"><Manage /></Route>
        <Route exact path="/superadmin/category/create"><Create /></Route>
      </BrowserRouter>
    </div>
  )
}

export default App
