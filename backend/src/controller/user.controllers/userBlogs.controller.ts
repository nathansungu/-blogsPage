import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";
const client = new PrismaClient();

const userBlogs = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  const blogs = await client.posts.findMany({
    where: {
      user_id: id,
      isDeleted: false,
    },
  });
  if (blogs.length === 0) {
    res.status(404).json("Your blogs will apper here once you create one");
    return;
  }
  res.status(200).json(blogs);
  return;
});

export default userBlogs;
