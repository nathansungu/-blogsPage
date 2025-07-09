
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { loginSchema } from "../../zod/userSchema";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const login = asyncHandler(async (req: Request, res: Response) => {
  const { userName, emailAddress, password } = await loginSchema.parseAsync(
    req.body
  );

  const validIdentifiers = await client.user.findFirst({
    where: {
      OR: [{ emailAddress }, { userName }],
    },
  });

  if (validIdentifiers) {
    const passMatch = await bcrypt.compare(password, validIdentifiers.password);

    if (passMatch) {
      const { password, isDeleted, createdAt, updatedAt, ...otherDetails } = validIdentifiers;
      const secrete = "399c56018836cc95c7e6e14b8a1e5347a83e7b316a201e6dae7613a5a04a03af"
      res.status(201).json({ message: "Login successful" });
      //TODO: implement jwt tokens
      jwt.sign(
        { otherDetails},
        secrete,
        { expiresIn: "1h" },
        (err, token) => {
          res.send(token);
        }
      );

      return;
    } else {
      res.status(400).json({ message: "invalid credentials" });

      return;
    }
  }
});

export default login;
