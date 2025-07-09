import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { updatePasswordSchema } from "../../zod/userSchema";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  const { id, oldPassword, newPassword } =
    await updatePasswordSchema.parseAsync(req.body);

  const user = await client.user.findUnique({
    where: { id: id },
  });

  if (!user || user.password !== oldPassword) {
    res.status(400).send({ message: "Old password is incorrect" });
    return;
  }

  const updatedUser = await client.user.update({
    where: { id: id },
    data: { password: newPassword },
  });

  if (updatedUser) {
    const { password, isDeleted, ...others } = updatedUser;
    res
      .status(200)
      .send({ message: "Password updated successfully", user: others });
    return;
  }
});

export default updatePassword;
