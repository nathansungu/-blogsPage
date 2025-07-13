import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import asyncHandler from "../../utilities/asyncHandler";
import user from "../../routes/user.routes/user.routes";
const client = new PrismaClient();
const logedIn= asyncHandler( async(req:Request, res:Response)=>{

    const userId = req.user?.id
    
    if(userId){
        res.status(200).json({data:user, message:"logedIn", status:true})
    }else{
        res.status(400).json({message:"Login to proced", status:false
        })
    }

}
)
export default logedIn;