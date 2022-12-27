
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import { useSelector } from 'react-redux';
export default function SemiProctedRoute({children,...rest}){
  const {user,isAuth}=useSelector((state) => state.auth);
    if(!isAuth && !user){
        return <Navigate to="/" />;
    }
    else if(isAuth && !user.activated ){
        return children
    }
    else{
       return  <Navigate to="/rooms" />
    }
    
}
