import { Hono } from "hono";
import userRouter from "./routes/user";

const app = new Hono();
app.route("/api/v1/user", userRouter);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

export default app;
