"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createuser_controller_1 = __importDefault(require("../../controller/authentication/createuser.controller"));
const loginuser_controller_1 = __importDefault(require("../../controller/authentication/loginuser.controller"));
const logedinUser_controller_1 = __importDefault(require("../../controller/user.controllers/logedinUser.controller"));
const isLogedin_middleware_1 = __importDefault(require("../../middlewares/isLogedin.middleware"));
const logout_controller_1 = __importDefault(require("../../controller/authentication/logout.controller"));
isLogedin_middleware_1.default;
const auth = (0, express_1.Router)();
auth.post("/login", loginuser_controller_1.default);
auth.get("/logout", logout_controller_1.default);
auth.post("/register", createuser_controller_1.default);
auth.get("/me", isLogedin_middleware_1.default, logedinUser_controller_1.default);
exports.default = auth;
