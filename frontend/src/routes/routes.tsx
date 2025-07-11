import { Route, Routes } from "react-router-dom";
import  HandleRegistration from "../pages/register";
import Login from "../pages/login";
import HomePage from "../pages/home";

const PagesRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/register" element={<HandleRegistration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<HomePage/>}/>
            
        </Routes>
        </>
    )
}

export default PagesRoutes;
