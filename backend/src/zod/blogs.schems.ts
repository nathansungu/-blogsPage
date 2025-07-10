import { z } from "zod";

const createBlogSchema = z.object({
  imgUrl: z.string(),
  title: z.string(),
  synopsis: z.string(),
  content: z.string(),
});

const updateBlogSchema = z.object({
  
  imgUrl: z.string(),
  title: z.string(),
  synopsis: z.string(),
  content: z.string(),
});

export { createBlogSchema , updateBlogSchema};
