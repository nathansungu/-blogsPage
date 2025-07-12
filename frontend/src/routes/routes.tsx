import { Route, Routes } from "react-router-dom";
import  HandleRegistration from "../pages/register";
import Login from "../pages/login";
import HomePage from "../pages/home";
import CreateBlogPage from "../pages/createBlog";

const PagesRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/register" element={<HandleRegistration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-blog" element={<CreateBlogPage/>}/>
            
        </Routes>
        </>
    )
}

export default PagesRoutes;
