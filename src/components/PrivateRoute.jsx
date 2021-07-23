import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuth from '../auth/useAuth';

export default function PrivateRoute({component: Component, ...rest}) {
    const auth = useAuth()
    return (
        <Route {...rest}>
            {auth.isLogged() ?  <Component/> : <Redirect to="/login"/>}
         
           
        </Route>
    )
}
