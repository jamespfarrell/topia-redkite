
import React from "react"
import { Router } from "@reach/router"
import Home from "../components/Home"
import RedKite from '../components/RedKite/Projects'


const App = () => (
  <Router>
    <Home path="xxx" />
    <RedKite path=":orgStub/projects" />
    <RedKite path="projects" />
  </Router>
)

export default App
