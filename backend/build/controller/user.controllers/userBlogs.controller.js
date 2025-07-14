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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const asyncHandler_1 = __importDefault(require("../../utilities/asyncHandler"));
const client = new client_1.PrismaClient();
const userBlogs = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const blogs = yield client.posts.findMany({
        where: {
            user_id: userId,
            isDeleted: false,
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    secondName: true
                }
            }
        }
    });
    if (blogs.length === 0) {
        res.status(404).json("Your blogs will apper here once you create one");
        return;
    }
    res.status(200).json({ data: blogs });
    return;
}));
exports.default = userBlogs;
