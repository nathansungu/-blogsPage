import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express";
import asyncHandler from "../../utilities/asyncHandler";

const client =  new PrismaClient();

const userBlogs = asyncHandler( async (req:Request, res:Response)=>{
    const userId = req.user?.id
    const blogs = await client.posts.findMany({
        where:{
            user_id:userId, isDeleted:false
        }

    })

    return res.status(200).json({data:blogs})

}
)

export default userBlogs;