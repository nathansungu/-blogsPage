import { Route, Routes } from "react-router-dom";
import  HandleRegistration from "../pages/register";
import Login from "../pages/login";
import HomePage from "../pages/home";
import CreateBlogPage from "../pages/createBlog";
import DashBoard from "../pages/dashboar";
import UserBlogs from "../pages/useblogs";
import UpdateBlog from "../pages/update";
const PagesRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/register" element={<HandleRegistration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/add-blog" element={<CreateBlogPage/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>    
            <Route path="/blogs"element= {<UserBlogs/>}/>  
            <Route path="/update/blog/:id"element={<UpdateBlog/>}/>      
        </Routes>
        </>
    )
}

export default PagesRoutes;
