import { updateUserSchema } from "../../zod/userSchema";
import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const updateUserDetails = asyncHandler( async (req: Request, res: Response) => {
 
    const { id, ...otherData } = req.body;

    const parsedData = updateUserSchema.parse(otherData);
    const updatedUser = await client.user.update({
      where: { id: id },
      data: parsedData,
    });

    if (updatedUser) {
      const { isDeleted, ...others } = updatedUser;
      res
        .status(200)
        .send({ message: "User details updated successfully", user: others });
      return;
    }
  })

export default updateUserDetails;
