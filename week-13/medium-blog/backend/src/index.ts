import { Hono } from "hono";

import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";

const app = new Hono().basePath("/api/v1/");

app.get("/", (c) => {
    return c.text("Hello Hono!");
});


app.route("/user", userRouter);
app.route("/blog", blogRouter)


export default app;
