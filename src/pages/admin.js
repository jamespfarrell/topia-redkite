
import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/admin/Dashboard"
import Users from "../components/admin/Users"
import AdminRoute from "../components/AdminRoute"
import AdminLayout from '../components/AdminLayout'

const App = () => (
  <AdminLayout>
    <Router>
      <AdminRoute path="/admin" component={Dashboard} />
      <AdminRoute path="/admin/users" component={Users} />
    </Router>
  </AdminLayout>
)

export default App
