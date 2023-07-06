import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma";

const router = express.Router();

// const authMiddleware = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let token = req.headers.authorization;

//   if (!token || !token.startsWith("Bearer")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   token = token.split(" ")[1];

//   try {
//     const user = await prisma.user.findFirst({
//       where: { token },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "Not Found !" });
//     }

//     req.user = {
//       email: user.email,
//       id: user.id,
//       image: user.image,
//       token: user.token,
//     };

//     next();
//   } catch (error: any) {
//     console.log("Error Getting User : ", error.message);

//     res.status(500).json({ message: "Error Getting User" });
//   }
// };

// router.get("/me", authMiddleware, async (req: Request, res: Response) => {
//   return res.json(req.user);
// });

router.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    console.log(email);

    const exisitingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (exisitingUser) {
      return res.status(500).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    const updatedUser = await prisma.user.update({
      where: { id: newUser.id },
      data: {
        token,
      },
      select: {
        id: true,
        email: true,
        image: true,
        token: true,
        name: true,
        companyCreated: true,
        password: false,
      },
    });

    res.status(201).json({ ...updatedUser });
  } catch (error: any) {
    console.log("Error creating User : ", error.message);

    res.status(500).json({ message: "Error creating User" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const comparedPassword = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!comparedPassword) {
      return res.status(401).json({
        message: "Wrong credentials !",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "30d" }
    );

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        token,
      },
      select: {
        id: true,
        email: true,
        image: true,
        token: true,
        name: true,

        password: false,
      },
    });

    res.status(200).json({ ...updatedUser });
  } catch (error: any) {
    console.log("Error Logging in user : ", error.message);
  }
});

export default router;
