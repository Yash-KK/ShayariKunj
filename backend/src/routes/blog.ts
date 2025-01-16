import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { getPrisma } from "prisma/prismaFunctions";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    decoded: JWTPayload;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return c.json(
      {
        status: "fail",
        message: "no token provided",
      },
      401,
    );
  }
  try {
    const decoded = await verify(token, c.env.JWT_SECRET);
    c.set("decoded", decoded);
    await next();
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "invalid token",
      },
      403,
    );
  }
});

blogRouter.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const userId = c.get("decoded").id;
  const blogs = await prisma.blog.findMany({
    where: {
      authorId: String(userId),
    },
  });
  return c.json({
    blogs: blogs,
  });
});

blogRouter.post("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const userId = c.get("decoded").id;

  try {
    const body = await c.req.json();
    body.authorId = userId;
    const blog = await prisma.blog.create({
      data: body,
    });
    return c.json(
      {
        status: "success",
        message: "blog created",
        blog: blog,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "failed to create a blog",
      },
      400,
    );
  }
});
export default blogRouter;
