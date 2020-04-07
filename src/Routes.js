import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './pages/Main/index'
import Users from './pages/Users/index'
import NewUsers from './pages/NewUsers'
import NewPredios from './pages/NewPredios'
import EditUser from    './pages/EditUser'

export default function Routes(){
    return(
        
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/users' component={Users} />
                <Route path='/new/user' component={NewUsers} />
                <Route path='/register/predios' component={NewPredios} />
                <Route path='/edit/users' component={EditUser} />
            </Switch>
        </BrowserRouter>
        
    )
}