import React, { useEffect, useState } from 'react'
import { BrowserRouter,Redirect,Route } from 'react-router-dom'
import Home from './component/mainComponent/Home'
import Login from './component/auth/Login'
import Register from './component/auth/Register'
import Protected from './component/auth/Protected'
import Dashboard from './component/mainComponent/Dashboard'
import Unpublished from './component/categories/Unpublished'
import Manage from './component/categories/Manage'
import Create from './component/categories/Create'
import CategoryEdit from './component/categories/CategoryEdit'
import Posts from './component/posts/Manage'
import TrashPost from './component/posts/TrashPost'
import PostEdit from './component/posts/PostEdit'
import Add from './component/posts/Add'
import PostDetails from './component/posts/PostDetails'
import FavouritePost from './component/posts/FavouritePost'
import ActiveUser from './component/users/ActiveUser'
import DeactiveUsers from './component/users/DeactiveUsers'
import ManageRoles from './component/users/ManageRoles'
import UserRequest from './component/users/UserRequest'
import UserDetails from './component/users/UserDetails'
import RoleCreate from './component/users/RoleCreate'
import SubsCriberManage from './component/subscriber/SubscriberManage'
import SendNews from './component/subscriber/SendNews'
import AllUser from './component/email/AllUser'
import Email from './component/email/Email'
import Setting from './component/profile/Setting'
import CommentsByMe from './component/comment/CommentsByMe'
import Comments from './component/comment/Comments'
import Notification from './component/notification/Notification'
import UserDetailsRequest from './component/users/UserDetailsRequest'
import RoleProvide from './component/users/RoleProvide'

import axios from 'axios'
import ChangePassword from './component/profile/ChangePassword'

const App = () => {

  const [user, setUser] = useState([]);

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        return <Redirect to="/auth/login"/>
      }
      const getUsers = async () => {
        const response = await axios
          .get("user")
          .catch((error) => console.log(error.resp));
          setUser(response.data.user);
      };
      getUsers();
    }, [])

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/auth/login"><Login /></Route>
        <Route exact path="/auth/registration"><Register /></Route>
        <Route  path="/superadmin/dashboard"><Protected Cmp={Dashboard} user={user} /></Route>
        {/* categories */}
        <Route exact path="/superadmin/category/manage"><Protected Cmp={Manage} /></Route>
        <Route exact path="/superadmin/category/unpublished"><Protected Cmp={ Unpublished }/></Route>
        <Route exact path="/superadmin/category/create"><Protected Cmp={Create} /></Route>
        <Route exact path="/superadmin/category/update/:id"><Protected Cmp={CategoryEdit} /></Route>
        {/* posts */}
        <Route exact path="/superadmin/posts/manage"><Protected Cmp={Posts} /></Route>
        <Route exact path="/superadmin/posts/trash"><Protected Cmp={TrashPost} /></Route>
        <Route exact path="/superadmin/post/create"><Protected Cmp={Add} /></Route>
        <Route exact path="/post/update/:id"><Protected Cmp={PostEdit} /></Route>
        <Route exact path="/post/details/:id"><Protected Cmp={PostDetails} /></Route>
        <Route exact path="/posts/favourite"><Protected Cmp={FavouritePost} /></Route>
        
        {/* users */}
        <Route exact path="/superadmin/users/active"><Protected Cmp={ActiveUser} /></Route>
        <Route exact path="/superadmin/users/deactive"><Protected Cmp={DeactiveUsers} /></Route>
        <Route exact path="/superadmin/users/roles"><Protected Cmp={ManageRoles} /></Route>
        <Route exact path="/superadmin/users/requests"><Protected Cmp={UserRequest} /></Route>
        <Route exact path="/user/details/:id"><Protected Cmp={UserDetails} /></Route>
        <Route exact path="/superadmin/role/create"><Protected Cmp={RoleCreate} /></Route>
        <Route exact path="/request/details/:id"><Protected Cmp={UserDetailsRequest} /></Route>
        <Route exact path="/user/update/:id"><Protected Cmp={RoleProvide} /></Route>
        
        {/* subscriber manage */}
        <Route exact path="/superadmin/subscriber/manage"><Protected Cmp={SubsCriberManage} /></Route>
        <Route exact path="/superadmin/subscriber/sendnews"><Protected Cmp={SendNews} /></Route>
        {/* Emailing */}
        <Route exact path="/superadmin/email/users"><Protected Cmp={AllUser} /></Route>
        <Route exact path="/user/email/:id"><Protected Cmp={Email} /></Route>
        {/* profile */}
        <Route exact path="/superadmin/profile/settings"><Protected Cmp={Setting} /></Route>
        <Route exact path="/password/change"><Protected Cmp={ChangePassword} /></Route>
        {/* comments */}
        <Route exact path="/comments"><Protected Cmp={Comments} /></Route>
        <Route exact path="/superadmin/comments"><Protected Cmp={CommentsByMe} /></Route>

        {/* notification */}
        <Route exact path="/superadmin/notification"><Protected Cmp={Notification} /></Route>
        
      </BrowserRouter>
    </div>
  )
}

export default App
