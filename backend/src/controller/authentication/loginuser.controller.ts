import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { loginSchema } from "../../zod/userSchema";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const login = asyncHandler(async (req: Request, res: Response) => {

  const userInput= await loginSchema.parseAsync(req.body);

  const validIdentifiers = await client.user.findFirst({
    where: {
      OR: [{ emailAddress:userInput.identifier }, { userName:userInput.identifier}],
    },
  });
  if (!validIdentifiers) {
    res.status(400).json({ message: "invalid credentials" });
    return;
  }

  const passMatch = await bcrypt.compare(userInput.password, validIdentifiers.password);

  if (!passMatch) {
    res.status(400).json({ message: "invalid credentials" });
    return;
  }

  const { password, isDeleted, createdAt, updatedAt, ...userDetails } =  validIdentifiers;
  
  const token = jwt.sign(userDetails, process.env.secretKey!, { expiresIn: "2h" });
  res
  .cookie("authTokencodey", token)
  .json({message:"login sucessful"});

  return;
});

export default login;
