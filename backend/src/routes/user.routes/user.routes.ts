import { Router } from "express";
import updateUserDetails from "../../controller/user.controllers/updateUserDetails.controller";
import updatePassword from "../../controller/user.controllers/updatePassword.controller";
import userBlogs from "../../controller/user.controllers/userBlogs.controller";

const user = Router();

user.patch("/", updateUserDetails);
user.patch("/password/:Id", updatePassword);
user.get("/blogs", userBlogs);

export default user;
