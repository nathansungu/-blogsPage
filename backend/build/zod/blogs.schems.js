"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
const createBlogSchema = zod_1.z.object({
    imgUrl: zod_1.z.string(),
    title: zod_1.z.string(),
    synopsis: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.createBlogSchema = createBlogSchema;
const updateBlogSchema = zod_1.z.object({
    imgUrl: zod_1.z.string(),
    title: zod_1.z.string(),
    synopsis: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateBlogSchema = updateBlogSchema;
