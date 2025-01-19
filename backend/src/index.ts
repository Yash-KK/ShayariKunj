import { Hono } from "hono";
import authorRouter from "./routes/author";
import quoteRouter from "./routes/quote";
import tagRouter from "./routes/tag";

const app = new Hono();
app.route("/api/v1/author", authorRouter);
app.route("/api/v1/quotes", quoteRouter);
app.route("/api/v1/tags", tagRouter);
app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

export default app;
