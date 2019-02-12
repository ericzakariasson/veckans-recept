import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Units from './components/Units'
import Ingredients from './components/Ingredients'

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin/ingredienser" component={Ingredients} />
      <Route path="/admin/enheter" component={Units} />
      <Route path="/admin" component={Dashboard} />
    </Switch>
  )
}

export default Admin
