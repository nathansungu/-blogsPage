import { Request, Response } from "express";
import { createBlogSchema } from "../../zod/blogs.schems";
import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/asyncHandler";

const client = new PrismaClient();

const createBlog = asyncHandler(async (req: Request, res: Response) => {
 
    const { imgUrl, title, synopsis, content } =
      await createBlogSchema.parseAsync(req.body);
      
      const user_id = req.user!.id;

    const newBlog = await client.posts.create({
      data: { user_id:user_id, imageUrl: imgUrl, title, synopsis, content },
    });
    const {isDeleted, updatedAt,...others}=newBlog;
    
    res.status(201).send({ blog:others, message: "Blog added successfuly" });
    return
})

export default createBlog;
