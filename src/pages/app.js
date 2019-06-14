
import React from "react"
import { Router } from "@reach/router"
import Welcome from "../components/Welcome"
import Profile from "../components/Profile"
import Logout from "../components/Logout"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"
import ActivateAccount from "../components/ActivateAccount"
import NewProject from '../components/Project/New'
import AllProjects from '../components/Project/All'

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/app/welcome" component={Welcome} />
    <PrivateRoute path="/app/logout" component={Logout} />
    <PrivateRoute path="/app/projects" component={AllProjects} />
    <PrivateRoute path="/app/organizations/:orgId/project/new" component={NewProject} />
    <Login path="/app/login" />
    <ActivateAccount path='/app/activate/:token' />
  </Router>
)

export default App
