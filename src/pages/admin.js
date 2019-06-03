
import React from "react"
import { Router } from "@reach/router"
import Dashboard from "../components/admin/Dashboard"
import Users from "../components/admin/Users"
import NewsletterEmails from "../components/admin/NewsletterEmails"
import Organizations from "../components/admin/Organizations"
import AdminRoute from "../components/AdminRoute"
import AdminLayout from '../components/AdminLayout'

const App = () => (
  <AdminLayout>
    <Router>
      <AdminRoute path="/admin" component={Dashboard} />
      <AdminRoute path="/admin/users" component={Users} />
      <AdminRoute path="/admin/newsletter" component={NewsletterEmails} />
      <AdminRoute path="/admin/organizations" component={Organizations} />
    </Router>
  </AdminLayout>
)

export default App
