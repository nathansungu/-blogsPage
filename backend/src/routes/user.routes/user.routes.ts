import { Router } from "express";
import updateUserDetails from "../../controller/user.controllers/updateUserDetails.controller";
import updatePassword from "../../controller/user.controllers/updatePassword.controller";
import userBlogs from "../../controller/user.controllers/userBlogs.controller";
import checkLogin from "../../middlewares/isLogedin.middleware";
const user = Router();

user.patch("/", checkLogin, updateUserDetails);
user.patch("/password/:Id", checkLogin,updatePassword);
user.get("/blogs", checkLogin,userBlogs);

export default user;
