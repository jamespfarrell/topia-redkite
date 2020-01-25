
import React from "react"
import { Router } from "@reach/router"
import Home from "../components/Home"


const App = () => (
  <Router>
    <RedKite path="/redkite/:orgStub/projects" />
    <Home path="/redkite/index" />
  </Router>
)

export default App
