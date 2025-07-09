import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userSchema } from "../../zod/userSchema";
import bcrypt from "bcrypt";
import asyncHandler from "../../utilities/asyncHandler";
const client = new PrismaClient();

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, secondName, userName, emailAddress, password } =
    await userSchema.parseAsync(req.body);

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await client.user.create({
    data: {
      firstName,
      secondName,
      userName,
      emailAddress,
      password: hashedPass,
    },
  });
  res.status(201).json({ data: newUser, message: "user created successfuly " });

  return;
});
export default createUser;
