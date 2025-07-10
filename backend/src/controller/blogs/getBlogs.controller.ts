import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const blogs = await client.posts.findMany({
  
    where: { isDeleted: false , user_id: userId },
  });
  if (blogs) {
    res.status(200).send({ blogs: blogs });
    return;
  } else {
    res.status(404).send({ message: "No blogs found." });
    return;
  }
});

export default getBlogs;
