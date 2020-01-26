
import React from "react"
import { Router } from "@reach/router"
import Home from "../components/Home"
import RedKite from '../components/RedKite/Projects'
import Logout from "../components/Logout"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"

const App = () => (
  <Router>
    <PrivateRoute path="logout" component={Logout} />
    <PrivateRoute path="projects" component={RedKite} />
    <Home path="xxx" />
    <Login path="login" />
    <RedKite path=":orgStub/projects" />
    
  </Router>
)

export default App
