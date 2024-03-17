/**
 * @module UserRouter
 * @description Defines routes and handlers for user-related functionalities in the serverless backend.
 */

import { Hono, Context } from "hono";
import { PrismaClient } from "@prisma/client/edge"; 
import { withAccelerate } from "@prisma/extension-accelerate"; 
import { sign } from "hono/jwt"; 
import {signinInput, signupInput} from "@shubham1091/medium-blog-common"

/**
 * Represents the router for user-related routes.
 */
export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string; // Binding for database URL
        JWT_SECRET: string; // Binding for JWT secret key
    };
}>();

/**
 * Handles user signup operation.
 * @param {Context} c - The context object containing request and response objects.
 * @returns {Promise} A Promise that resolves to the JSON response containing the JWT token.
 */
userRouter.post("/signup", async (c: Context) => {
    const {success} = signupInput.safeParse(c.req.json())
    if(!success) {
        c.status(400)
        return c.json({error: "Invalid input"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });

        const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

        return c.json({ token });
    } catch (err) {
        console.error("signup error ", err);
        return c.status(403);
    }
});

/**
 * Handles user signin operation.
 * @param {Context} c - The context object containing request and response objects.
 * @returns {Promise} A Promise that resolves to the JSON response containing the JWT token.
 */
userRouter.post("/signin", async (c: Context) => {
    const {success} = signinInput.safeParse(c.req.json())
    if(!success) {
        c.status(400)
        return c.json({error: "Invalid input"})
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const usr = await prisma.user.findFirst({
            where: {
                AND: [{ email: body.email }, { password: body.password }],
            },
        });
        if (!usr) {
            c.status(403);
            return c.json({ error: "user not found" });
        }

        const token = await sign({ userId: usr.id }, c.env.JWT_SECRET);

        return c.json({ token });
    } catch (error) {}
    return c.text("helo");
});
