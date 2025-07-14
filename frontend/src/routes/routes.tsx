import { Route, Routes } from "react-router-dom";
import HandleRegistration from "../pages/register";
import Login from "../pages/login";
import HomePage from "../pages/home";
import CreateBlogPage from "../pages/createBlog";
import DashBoard from "../pages/dashboar";
import UserBlogs from "../pages/useblogs";
import UpdateBlog from "../pages/update";
import Profile from "../pages/profile";
import Blog from "../pages/ blog";

import Protected from "../protected";
const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<HandleRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <DashBoard />
            </Protected>
          }
        />

        <Route
          path="/add-blog"
          element={
            <Protected>
              <CreateBlogPage />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <DashBoard />
            </Protected>
          }
        />
        <Route
          path="/blogs"
          element={
            <Protected>
              <UserBlogs />
            </Protected>
          }
        />
        <Route
          path="/update/blog/:id"
          element={
            <Protected>
              <UpdateBlog />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Protected>
              <Blog />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default PagesRoutes;
