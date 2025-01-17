import { Hono } from "hono";
import { sign } from "hono/jwt";
import { getPrisma } from "prisma/prismaFunctions";
import { SignUpType, SignInType } from "@yashkharche/zod-module";

import bcrypt from "bcryptjs";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const body: SignUpType = await c.req.json();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    body.password = hashedPassword;
    const user = await prisma.user.create({
      data: body,
    });
    return c.json(
      {
        status: "success",
        message: "user Signed Up!",
        user: user,
      },
      200,
    );
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "failed to Sign Up user",
      },
      400,
    );
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const { email, password }: SignInType = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return c.json(
        {
          status: "fail",
          message: "user does not exist",
        },
        400,
      );
    }

    const isVerified = await bcrypt.compare(password, user.password);
    if (isVerified) {
      const token = await sign(
        {
          id: user.id,
        },
        c.env.JWT_SECRET,
      );

      return c.json(
        {
          status: "success",
          message: "verified",
          token: token,
        },
        200,
      );
    } else {
      return c.json(
        {
          status: "fail",
          message: "in correct password",
        },
        401,
      );
    }
  } catch (error) {
    return c.json(
      {
        status: "fail",
        message: "failed to SignIn ",
      },
      400,
    );
  }
});
userRouter.get("/test", (c) => {
  return c.text("it works");
});
export default userRouter;
