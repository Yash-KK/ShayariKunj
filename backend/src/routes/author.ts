import { Hono } from "hono";
import { sign } from "hono/jwt";
import { getPrisma } from "prisma/prismaFunctions";
import { SignUpType } from "@yashkharche/zod-module";
import bcrypt from "bcryptjs";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/register", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const body: SignUpType = await c.req.json();

    const existingUser = await prisma.author.findUnique({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return c.json(
        {
          status: false,
          message: "author with email already exists!",
        },
        400,
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashedPassword;
    const user = await prisma.author.create({
      data: body,
    });
    return c.json(
      {
        status: false,
        message: "author registered!",
        user: user,
      },
      200,
    );
  } catch (error) {
    console.log(error);
    return c.json(
      {
        status: false,
        message: "failed to register author",
      },
      400,
    );
  }
});

userRouter.post("/login", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const { email, password } = await c.req.json();
    const user = await prisma.author.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return c.json(
        {
          status: false,
          message: "author does not exist",
        },
        400,
      );
    }
    const isVerified = await bcrypt.compare(password, user.password);
    if (isVerified) {
      const token = await sign(
        {
          id: user.id,

          exp: Math.floor(Date.now() / 1000) + 60 * 5,
        },

        c.env.JWT_SECRET,
      );

      return c.json(
        {
          status: true,
          message: "Logged In",
          token: token,
        },
        200,
      );
    } else {
      return c.json(
        {
          status: false,
          message: "in-correct password",
        },
        401,
      );
    }
  } catch (error) {
    return c.json(
      {
        status: false,
        message: "Failed to login",
      },
      400,
    );
  }
});
userRouter.get("/test", (c) => {
  return c.text("it works");
});
export default userRouter;
