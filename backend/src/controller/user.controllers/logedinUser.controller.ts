import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../../utilities/asyncHandler";
const client = new PrismaClient();
const logedIn = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  if (user) {
    res.status(200).json({ data: user, message: "logedIn", status: true });
    return;
  }
});
export default logedIn;
