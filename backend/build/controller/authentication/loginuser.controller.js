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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const userSchema_1 = require("../../zod/userSchema");
const asyncHandler_1 = __importDefault(require("../../utilities/asyncHandler"));
const client = new client_1.PrismaClient();
const login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = yield userSchema_1.loginSchema.parseAsync(req.body);
    const validIdentifiers = yield client.user.findFirst({
        where: {
            OR: [{ emailAddress: userInput.identifier }, { userName: userInput.identifier }],
        },
    });
    if (!validIdentifiers) {
        res.status(400).json({ message: "invalid credentials" });
        return;
    }
    const passMatch = yield bcrypt_1.default.compare(userInput.password, validIdentifiers.password);
    if (!passMatch) {
        res.status(400).json({ message: "invalid credentials" });
        return;
    }
    const { password, isDeleted, createdAt, updatedAt } = validIdentifiers, userDetails = __rest(validIdentifiers, ["password", "isDeleted", "createdAt", "updatedAt"]);
    const token = jsonwebtoken_1.default.sign(userDetails, process.env.secretKey, { expiresIn: "2h" });
    res
        .cookie("authTokencodey", token)
        .json({ message: "login sucessful" });
    return;
}));
exports.default = login;
