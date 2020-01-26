
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

    <Home path="xxx" />
    <Login path="login" />
    <RedKite path=":orgStub/projects" />
    <RedKite path="projects" />
    <RedKite path="/" />
  </Router>
)

export default App
