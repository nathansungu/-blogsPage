import { Router } from "express";
import createUser from "../../controller/authentication/createuser.controller";
import login from "../../controller/authentication/loginuser.controller";
import logedIn from "../../controller/user.controllers/logedinUser.controller";
import checkLogin from "../../middlewares/isLogedin.middleware";
checkLogin
const auth = Router();

auth.post("/login", login )
auth.post("/register", createUser)
auth.get("/me",checkLogin,logedIn)


export default auth;