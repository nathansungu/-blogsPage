import { Router } from "express";
import createBlog from "../../controller/blogs/createBlog.controller";
import updateBlog from "../../controller/blogs/updateBlog.controller";
import blog from "../../controller/blogs/getBlog.controller";
import getBlogs from "../../controller/blogs/getBlogs.controller";
import deleteBlog from "../../controller/blogs/deleteBlog.controller";
import checkLogin from "../../middlewares/isLogedin.middleware";
const blogs =  Router();

blogs.post("/",checkLogin,createBlog)
blogs.patch("/:id", checkLogin, updateBlog)
blogs.get("/", getBlogs )
blogs.get("/:id", checkLogin, blog)
blogs.delete("/:id", checkLogin, deleteBlog)

export default blogs;