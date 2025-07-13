import { Router } from "express";
import createUser from "../../controller/authentication/createuser.controller";
import login from "../../controller/authentication/loginuser.controller";
import logedIn from "../../controller/user.controllers/logedinUser.controller";
import checkLogin from "../../middlewares/isLogedin.middleware";
import logout from "../../controller/authentication/logout.controller";
checkLogin
const auth = Router();

auth.post("/login", login )
auth.get("/logout",logout)
auth.post("/register", createUser)
auth.get("/me",checkLogin,logedIn)


export default auth;