import { Response, Request } from "express";
import { updateBlogSchema } from "../../zod/blogs.schems";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";
const client = new PrismaClient();

const updateBlog = asyncHandler( async (req: Request, res: Response) => {
  
    const { id } = req.params;
    const { imgUrl, title, synopsis, content } =
      await updateBlogSchema.parseAsync(req.body);

    const updatedBlog = await client.posts.update({
      where: { id: id },
      data: { imageUrl: imgUrl, title, synopsis, content },
    });
    if (updatedBlog) {
      const { createdAt, isDeleted, ...others } = updatedBlog;
      res.status(200).send({ message: "Blog updated ", blog: others });
      return;
    }
  } )

export default updateBlog;
