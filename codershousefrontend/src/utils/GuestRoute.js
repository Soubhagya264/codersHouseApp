import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
  import { useSelector } from "react-redux";

 
    
export default  function GuestRoute({children}){
    const {isAuth}=useSelector((state) => state.auth);
    if(isAuth){
        return <Navigate to="/rooms" />
    }
    return children

}