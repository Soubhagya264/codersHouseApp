

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

  import { useSelector } from 'react-redux';
  

export default function ProtectedRoute({children}){
  const {user,isAuth}=useSelector((state) => state.auth);

    if(!isAuth && !user){
        return <Navigate to="/" />;
    }
    else if(isAuth && !user.activated ){
        return <Navigate to="/activate" />
    }
    else{
       return  children;
    }
}