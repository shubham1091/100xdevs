import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        JWT_SECRET: string;
        DATABASE_URL: string;
    };
    Variables: {
        userId: string;
    };
}>().basePath("/api/v1/");

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/user/signup", async (c) => {
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

app.post("/user/signin", async (c) => {
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

app.use("/blog/*", async (c, next) => {
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

app.post("/blog", (c) => {
    return c.text("helo");
});
app.put("/blog", (c) => {
    return c.text("helo");
});
app.get("/blog/:id", (c) => {
    return c.text("helo");
});
app.get("/blog/bulk", (c) => {
    return c.text("helo");
});

export default app;
