import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { getPrisma } from "prisma/prismaFunctions";
import { CreateBlogType, UpdateBlogType } from "@yashkharche/zod-module";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    decoded: JWTPayload;
  };
}>();

// middleware
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
    const body: CreateBlogType = await c.req.json();
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
        authorId: String(userId),
      },
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

blogRouter.get("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param("id");
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    return c.json({
      status: "fail",
      message: `blog with mentioned Id does not exist`,
    });
  }
  return c.json(
    {
      blog: blog,
    },
    200,
  );
});

blogRouter.patch("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param("id");
  const body: UpdateBlogType = await c.req.json();
  try {
    const blog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: body,
    });
    return c.json(
      {
        status: "success",
        blog: blog,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "could not update blog",
      },
      400,
    );
  }
});

blogRouter.delete("/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogId = c.req.param("id");
  try {
    const blog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    return c.json(
      {
        status: "success",
        blog: blog,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "could not delete blog",
      },
      400,
    );
  }
});

export default blogRouter;
