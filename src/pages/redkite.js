
import React from "react"
import { Router } from "@reach/router"
import Home from "../components/Home"
import RedKite from '../components/RedKite/Projects'


const App = () => (
  <Router>
    <Home path="/redkite/index" />
    <RedKite path="/redkite/:orgStub/projects" />
    
  </Router>
)

export default App
