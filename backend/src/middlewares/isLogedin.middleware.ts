import jwt, { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../utilities/asyncHandler";
import { UserPayload } from "../types";

const checkLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authTokencodey } = req.cookies;

    if (!authTokencodey) {
      res.status(401).json({ message: "Unauthorized: Login to proceed" });
      return;
    }
    jwt.verify(
      authTokencodey,
      process.env.secretKey!,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized: Login to proceed" });
          return;
        }
        req.user = decoded as UserPayload;
      }
    );

    next();
  }
);

export default checkLogin; 