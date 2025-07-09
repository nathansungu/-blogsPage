import { z } from 'zod';

const userSchema = z.object({
   
  firstName: z.string(),
  secondName:  z.string(),
  userName: z.string(),
  emailAddress: z.string().email(),
  password: z.string().min(8),
});

const loginSchema = z.object({
    userName: z.string(),
    emailAddress: z.string(),
    password: z.string().min(8)
})

const updateUserSchema = z.object({
    firstName: z.string().optional(),
    secondName: z.string().optional(),
    userName: z.string().optional(),
    emailAddress: z.string().email().optional()
})

const updatePasswordSchema = z.object({
    id: z.string(),
    oldPassword: z.string(),
    newPassword: z.string().min(8)
})

export  {
    userSchema,
    updateUserSchema,
    loginSchema,
    updatePasswordSchema
}