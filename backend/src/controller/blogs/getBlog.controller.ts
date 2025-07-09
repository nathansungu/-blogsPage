import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";
const client = new PrismaClient();

const blog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const specificBlog = await client.posts.findUnique({
    where: { id: id, isDeleted: false },
  });
  if (specificBlog) {
    const { isDeleted, updatedAt, ...others } = specificBlog;
    res.status(200).send({ blog: others });

    return;
  } else {
    res.status(400).send("Ooops! Blog not found.");
    return;
  }
});

export default blog;
