"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updateUserDetails_controller_1 = __importDefault(require("../../controller/user.controllers/updateUserDetails.controller"));
const updatePassword_controller_1 = __importDefault(require("../../controller/user.controllers/updatePassword.controller"));
const userBlogs_controller_1 = __importDefault(require("../../controller/user.controllers/userBlogs.controller"));
const isLogedin_middleware_1 = __importDefault(require("../../middlewares/isLogedin.middleware"));
const user = (0, express_1.Router)();
user.patch("/", isLogedin_middleware_1.default, updateUserDetails_controller_1.default);
user.patch("/password/:Id", isLogedin_middleware_1.default, updatePassword_controller_1.default);
user.get("/blogs", isLogedin_middleware_1.default, userBlogs_controller_1.default);
exports.default = user;
