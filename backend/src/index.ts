import { Hono } from "hono";
import authorRouter from "./routes/author";

const app = new Hono();
app.route("/api/v1/author", authorRouter);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

export default app;
