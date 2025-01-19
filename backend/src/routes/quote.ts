import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

const quoteRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    decoded: JWTPayload;
  };
}>();

quoteRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return c.json(
      {
        status: false,
        message: "No token provided",
      },
      401,
    );
  }
  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    c.set("decoded", decoded);
    await next();
  } catch (error) {
    return c.json({
      status: false,
      message: "invalid token",
    });
  }
});
quoteRouter.get("/", (c) => {
  const decoded = c.get("decoded");
  const authorId = decoded.id;
  console.log(decoded);
  return c.json({
    message: "it works",
    authorId: authorId,
  });
});
export default quoteRouter;
