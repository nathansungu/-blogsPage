import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error)
    
    switch (error.code) {
      case 'P1001':
        res.status(500).json("Server is off");
        
        break;
      case 'P2002':
              
        const target = error.meta?.target ;    
        
        
        res.status(500).send(`${target} is taken `)
        break;
        

      default:
        res.status(500).json({message: "Oops!  something went wrong."})
        break;
    }

    return;
  }

  if (error instanceof ZodError) {
    const {
      message,
      path: [filed],
    } = error.errors[0];
    res.status(404).json({ error: `${filed} is ${message}` });
  }

 
};

export default errorHandler;
