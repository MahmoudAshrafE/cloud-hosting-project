import * as z from "zod";

//Create Article Schema
export const createArticleSkhema = z.object({
    title: z.string({
        error: (iss) => iss.input === undefined ? "Title is required." : "Invalid input."
    })
        .min(2, "title must be more than 2 characters")
        .max(200, "title must be less than 200 characters"),

    description: z.string().min(10, "title must be more than 10 characters")
})

// Register Schema
export const registerSchema = z.object({
    username: z.string().min(3).max(200),
    email: z.string().min(3).max(200).email(),
    password: z.string().min(6),
})

// Updating User Profile Schema
export const updatingProfileSchema = z.object({
    username: z.string().min(3).max(200).optional(),
    email: z.string().min(3).max(200).email().optional(),
    password: z.string().min(6).optional(),
})

// Login Schema
export const loginSchema = z.object({
    email: z.string().min(3).max(200).email(),
})

export const createCommentSchema = z.object({
    text: z.string().min(3).max(200),
    articleId: z.number()
})
export const updateCommentSchema = z.object({
    text: z.string().min(3).max(200),
})