
import React from "react"
import { Router } from "@reach/router"
import Home from "../components/Home"
import RedKite from '../components/RedKite/Projects'


const App = () => (
  <Router>
    <Home path="indexx" />
    <RedKite path=":orgStub/projects" />
    <RedKite path="projects" />
    <RedKite path="/" />
  </Router>
)

export default App
