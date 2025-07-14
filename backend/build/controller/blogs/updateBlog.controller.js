"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_schems_1 = require("../../zod/blogs.schems");
const client_1 = require("@prisma/client");
const asyncHandler_1 = __importDefault(require("../../utilities/asyncHandler"));
const client = new client_1.PrismaClient();
const updateBlog = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { imgUrl, title, synopsis, content } = yield blogs_schems_1.updateBlogSchema.parseAsync(req.body);
    const updatedBlog = yield client.posts.update({
        where: { id: id },
        data: { imageUrl: imgUrl, title, synopsis, content },
    });
    if (updatedBlog) {
        const { createdAt, isDeleted } = updatedBlog, others = __rest(updatedBlog, ["createdAt", "isDeleted"]);
        res.status(200).send({ message: "Blog updated ", blog: others });
        return;
    }
}));
exports.default = updateBlog;
