import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from './pages/Main/index'
import Users from './pages/Users/index'
import NewUsers from './pages/NewUsers'
import NewPredios from './pages/NewPredios'
import EditUser from    './pages/EditUser'
import Payment from './pages/UsersPayment'
import NewPayment from './pages/newPayment'

export default function Routes(){
    return(
        
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/users' component={Users} />
                <Route path='/new/user' component={NewUsers} />
                <Route path='/register/predios' component={NewPredios} />
                <Route path='/edit/users' component={EditUser} />
                <Route path='/payment' component={Payment} />
                <Route path='/new/payment' component={NewPayment} />

            </Switch>
        </BrowserRouter>
        
    )
}