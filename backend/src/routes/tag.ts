import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { getPrisma } from "prisma/prismaFunctions";

const tagRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    decoded: JWTPayload;
  };
}>();
tagRouter.use("/*", async (c, next) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
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
    const authorId = decoded.authorId;
    const author = await prisma.author.findUnique({
      where: {
        id: String(authorId),
        role: "ADMIN",
      },
    });
    if (!author) {
      return c.json({
        status: false,
        message: "author does not exist or is not an ADMIN!",
      });
    }
    c.set("decoded", decoded);
    await next();
  } catch (error) {
    return c.json({
      status: false,
      message: "invalid token",
    });
  }
});

tagRouter.get("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const tags = await prisma.tag.findMany();
  return c.json({
    tags: tags,
  });
});

tagRouter.post("/", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const { name } = await c.req.json();
  try {
    const existingTag = await prisma.tag.findUnique({
      where: {
        name: name.toLowerCase(),
      },
    });

    if (existingTag) {
      return c.json({
        status: false,
        message: "Tag already exists",
      });
    }
    const newTag = await prisma.tag.create({
      data: {
        name: name.toLowerCase(),
      },
    });
    return c.json({
      success: true,
      message: "new tag created",
      tag: newTag,
    });
  } catch (error) {
    return c.json({
      status: false,
      message: "failed to create tag",
    });
  }
});
export default tagRouter;
