"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const errorHandler = (error, req, res, next) => {
    var _a;
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.error(error);
        switch (error.code) {
            case 'P1001':
                res.status(500).json({ message: "Server is off" });
                break;
            case 'P2002':
                const target = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
                res.status(409).json({ message: `${target} is taken ` });
                break;
            default:
                res.status(500).json({ message: "Oops!  something went wrong." });
                break;
        }
        return;
    }
    else if (error instanceof zod_1.ZodError) {
        const { message, path: [filed], } = error.errors[0];
        console.log(error);
        switch (error.errors[0].code) {
            case "invalid_type":
                res.status(400).json({ message: `${filed} is ${message}` });
                return;
            case "too_small":
                res.status(400).json({ message: `${filed} is to short` });
                return;
            case "too_big":
                res.status(400).json({ message: "Input is too big" });
                return;
            case "invalid_union":
                res.status(400).json({ message: "Invalid union type" });
                return;
            default:
                res.status(400).json({ message: "Validation error" });
                return;
        }
    }
    else {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
exports.default = errorHandler;
