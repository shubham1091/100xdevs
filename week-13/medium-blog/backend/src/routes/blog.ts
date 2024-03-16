import { Hono, Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

/**
 * Represents the router for blog-related routes.
 */
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string; // Binding for database URL
        JWT_SECRET: string; // Binding for JWT secret key
    };
    Variables: {
        userId: string; // Variable to store user ID
    };
}>();

/**
 * Middleware to authenticate user via JWT token.
 * @param c - The context object containing request and response objects.
 * @param next - The next function to call the next middleware.
 * @returns The next middleware.
 */
blogRouter.use("*", async (c: Context, next: () => Promise<any>) => {
    const jwt = c.req.header("Authorization");
    if (!jwt) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

    c.set("userId", payload.userId);

    return next();
});

/**
 * Endpoint to create a new blog post.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the ID of the created post.
 */
blogRouter.post("/", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId"),
            },
        });
        return c.json({ id: post.id });
    } catch (error) {
        console.error(error);
        return c.status(403);
    }
});

/**
 * Endpoint to update an existing blog post.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the ID of the updated post.
 */
blogRouter.put("/", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const post = await prisma.post.update({
        data: {
            title: body.title,
            content: body.content,
        },
        where: {
            id: body.id,
        },
    });
    return c.json({ id: post.id });
});

/**
 * Endpoint to retrieve a blog post by its ID.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing the requested blog post.
 */
blogRouter.get("/", async (c: Context) => {
    const { id } = c.req.query();
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return c.status(404);
        }
        return c.json(post);
    } catch (error) {
        return c.status(404);
    }
});

/**
 * Endpoint to retrieve all blog posts.
 * @param c - The context object containing request and response objects.
 * @returns A JSON response containing an array of blog posts.
 */
blogRouter.get("/bulk", async (c: Context) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({});
        return c.json(posts);
    } catch (error) {
        console.log(error);
        return c.status(404);
    }
});
