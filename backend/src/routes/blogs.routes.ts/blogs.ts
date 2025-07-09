import { Router } from "express";
import createBlog from "../../controller/blogs/createBlog.controller";
import updateBlog from "../../controller/blogs/updateBlog.controller";
import blog from "../../controller/blogs/getBlog.controller";
import getBlogs from "../../controller/blogs/getBlogs.controller";
import deleteBlog from "../../controller/blogs/deleteBlog.controller";
import { checkLogin } from "../../middlewares/isLogedin.middleware";
const blogs =  Router();

blogs.post("/",checkLogin,createBlog)
blogs.patch("/:id", updateBlog)
blogs.get("/", getBlogs )
blogs.get("/:id", blog)
blogs.delete("/:id", deleteBlog)

export default blogs;