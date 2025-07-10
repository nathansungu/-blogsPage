import express, {Express, json} from "express";
import auth from "./routes/authentication/auth.route"
import blogs from "./routes/blogs.routes.ts/blogs";
import user from "./routes/user.routes/user.routes";
import errorHandler from "./middlewares/errorHandler.middleware";
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", auth)
app.use("/api/blogs", blogs)
app.use("/api/user", user)
app.use(errorHandler)

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`app is listening on port  ${port}`))

