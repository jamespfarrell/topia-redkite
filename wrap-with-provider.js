import React from "react"
import { Provider } from "mobx-react"
import SessionModel from "./src/models/SessionModel"

export default ({ element }) => (
  <Provider store={SessionModel}>{element}</Provider>
)
