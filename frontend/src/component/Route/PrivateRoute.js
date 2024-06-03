// import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

export function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();


  if (isAuthenticated  === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;

}
