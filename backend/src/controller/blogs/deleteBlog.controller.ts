import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const deleteBlog =asyncHandler(async (req: Request, res: Response) => {
 
    const { id } = req.params;

    const deletedBlog = await client.posts.update({
      where: { id: id },
      data: { isDeleted: true },
    });

    if (deletedBlog) {
      res.status(200).send({ message: "Blog deleted successfully" });
      return;
    }
  } )

export default deleteBlog;