import { Hono } from "hono";
import authorRouter from "./routes/author";
import quoteRouter from "./routes/quote";

const app = new Hono();
app.route("/api/v1/author", authorRouter);
app.route("/api/v1/quotes", quoteRouter);

app.get("/", async (c) => {
  return c.text("Hello Hono!");
});

export default app;
