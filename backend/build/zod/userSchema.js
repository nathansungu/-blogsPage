"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.loginSchema = exports.updateUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    secondName: zod_1.z.string(),
    userName: zod_1.z.string(),
    emailAddress: zod_1.z.string().email(),
    password: zod_1.z.string().min(5),
});
exports.userSchema = userSchema;
const loginSchema = zod_1.z
    .object({
    identifier: zod_1.z.string(),
    password: zod_1.z.string().min(5)
});
exports.loginSchema = loginSchema;
const updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    secondName: zod_1.z.string().optional(),
    userName: zod_1.z.string().optional(),
    emailAddress: zod_1.z.string().email().optional()
});
exports.updateUserSchema = updateUserSchema;
const updatePasswordSchema = zod_1.z.object({
    id: zod_1.z.string(),
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z.string().min(5)
});
exports.updatePasswordSchema = updatePasswordSchema;
