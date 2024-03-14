import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

userRouter.post("/signup", async (c) => {
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

userRouter.post("/signin", async (c) => {
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
