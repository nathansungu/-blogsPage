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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("../utilities/asyncHandler"));
const checkLogin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authTokencodey } = req.cookies;
    if (!authTokencodey) {
        res.status(401).json({ message: "Unauthorized: Login to proceed" });
        return;
    }
    jsonwebtoken_1.default.verify(authTokencodey, process.env.secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Unauthorized: Login to proceed" });
            return;
        }
        req.user = decoded;
    });
    next();
}));
exports.default = checkLogin;
