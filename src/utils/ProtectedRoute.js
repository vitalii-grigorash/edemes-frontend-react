import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {

  return (
    <Route>
      {
        () => props.isLoggedIn === true ? <Component {...props} /> : <Redirect to="./auth" />
      }
    </Route>
)}

export default ProtectedRoute;