import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { getPrisma } from "prisma/prismaFunctions";

const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    decoded: JWTPayload;
  };
}>();

adminRouter.use("/*", async (c, next) => {
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
adminRouter.get("/quotes/pending", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const pendingQuotes = await prisma.quote.findMany({
    where: {
      isApproved: false,
    },
  });
  return c.json({
    status: true,
    quotes: pendingQuotes,
  });
});
export default adminRouter;
