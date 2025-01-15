import { Hono } from "hono";
import { getPrisma } from "../prisma/prismaFunctions";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  return c.text("Hello Hono!");
});

export default app;
