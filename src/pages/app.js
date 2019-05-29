
import React from "react"
import { Router } from "@reach/router"
import Welcome from "../components/Welcome"
import Login from "../components/Login"
import PrivateRoute from "../components/PrivateRoute"

const App = () => (
  <Router>
    <PrivateRoute path="/app/welcome" component={Welcome} />
    <Login path="/app/login" />
  </Router>
)

export default App
