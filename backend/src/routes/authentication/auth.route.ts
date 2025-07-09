import { Router } from "express";
import createUser from "../../controller/authentication/createuser.controller";
import login from "../../controller/authentication/loginuser.controller";

const auth = Router();

auth.post("/login", login )
auth.post("/register", createUser)


export default auth;