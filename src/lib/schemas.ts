import { z } from "zod";

export const addProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().refine((val) => /^\d+$/.test(val), {
    message: "Price must be a number",
  }),
});
