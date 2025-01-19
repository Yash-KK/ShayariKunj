import { Hono } from "hono";
import userRouter from "./routes/user";
// import blogRouter from "./routes/blog";

const app = new Hono();
app.route("/api/v1/user", userRouter);
// app.route("/api/v1/blogs", blogRouter);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

export default app;
