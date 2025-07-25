"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createBlog_controller_1 = __importDefault(require("../../controller/blogs/createBlog.controller"));
const updateBlog_controller_1 = __importDefault(require("../../controller/blogs/updateBlog.controller"));
const getBlog_controller_1 = __importDefault(require("../../controller/blogs/getBlog.controller"));
const getBlogs_controller_1 = __importDefault(require("../../controller/blogs/getBlogs.controller"));
const deleteBlog_controller_1 = __importDefault(require("../../controller/blogs/deleteBlog.controller"));
const isLogedin_middleware_1 = __importDefault(require("../../middlewares/isLogedin.middleware"));
const userBlogs_controller_1 = __importDefault(require("../../controller/user.controllers/userBlogs.controller"));
const blogs = (0, express_1.Router)();
blogs.post("/", isLogedin_middleware_1.default, createBlog_controller_1.default);
blogs.patch("/:id", isLogedin_middleware_1.default, updateBlog_controller_1.default);
blogs.get("/", getBlogs_controller_1.default);
blogs.get("/user", isLogedin_middleware_1.default, userBlogs_controller_1.default);
blogs.get("/:id", isLogedin_middleware_1.default, getBlog_controller_1.default);
blogs.delete("/:id", isLogedin_middleware_1.default, deleteBlog_controller_1.default);
exports.default = blogs;
