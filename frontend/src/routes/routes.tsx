import { Route, Routes } from "react-router-dom";
import  HandleRegistration from "../pages/register";

const PagesRoutes = ()=>{
    return (
        <>
        <Routes>
            <Route path="/register" element={<HandleRegistration/>}/>
        </Routes>
        </>
    )
}

export default PagesRoutes;
