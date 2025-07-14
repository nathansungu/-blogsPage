"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/authentication/auth.route"));
const blogs_1 = __importDefault(require("./routes/blogs.routes.ts/blogs"));
const user_routes_1 = __importDefault(require("./routes/user.routes/user.routes"));
const errorHandler_middleware_1 = __importDefault(require("./middlewares/errorHandler.middleware"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
//add cors
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use("/api/auth", auth_route_1.default);
app.use("/api/blogs", blogs_1.default);
app.use("/api/user", user_routes_1.default);
app.use(errorHandler_middleware_1.default);
const port = process.env.PORT || 4000;
app.listen(port, (e) => {
    e ? console.error(e) :
        console.log(`app is listening on port  ${port}`);
});
