import React, { Component, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route,Routes, 
  // useLocation 
} from "react-router-dom";


const ProtectedRoute = () => {
  const {loading,isAuthenticated}=useSelector((state)=>state.user);
 //const isAuthenticated = false; // your logic here
//  const location = useLocation();
  return (
    <Fragment>
    {loading === false && (
      <Routes>
      <Route
        render={(props) => {
          if (isAuthenticated === false) {
            return <Navigate to="/login" />;
          }

         /* if (isAdmin === true && user.role !== "admin") {
            return <Navigate to="/login" />;
          }*/

          return <Component {...props} />;
        }}
      />
      </Routes>
    )}
  </Fragment>
  )
}

export default ProtectedRoute
