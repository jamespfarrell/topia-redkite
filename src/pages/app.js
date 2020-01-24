
import React from "react"
import { Router } from "@reach/router"
import Welcome from "../components/Welcome"
import Profile from "../components/Profile"
import Logout from "../components/Logout"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import ActivateAccount from "../components/ActivateAccount"
import NewProject from '../components/Project/New'
import EditProject from '../components/Project/Edit'
import AllProjects from '../components/Project/All'
import NgoPage from '../components/NGO/Page'
import NgoProjects from '../components/NGO/Project'
import NgoDonors from '../components/NGO/Donors'
import NgoAbout from '../components/NGO/About'
import NgoSupport from '../components/NGO/Support'

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/app/welcome" component={Welcome} />
    <PrivateRoute path="/app/logout" component={Logout} />
    <PrivateRoute path="/app/projects" component={AllProjects} />
    <PrivateRoute path="/app/projects/:projectId/edit" component={EditProject} />
    <PrivateRoute path="/app/organizations/:orgId/project/new" component={NewProject} />
    <Login path="/app/login" />
    <ActivateAccount path='/app/activate/:token' />
    <NgoPage path='/app/ngo/:id' />
    <NgoProjects path='/app/ngo/:id/projects' />
    <NewProject path='/app/ngo/:id/projects/new' />
    
    <NgoDonors path='/app/ngo/:id/donors' />
    
    <NgoAbout path='/app/ngo/:id/about' />
    <PrivateRoute path="/app/ngo/:id/support" component={NgoSupport} />
  </Router>
)

export default App
