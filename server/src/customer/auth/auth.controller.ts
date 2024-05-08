import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../../Types/model.ts";

export const login = async (req: Request, res: Response) => {
  const user = req.user as User;
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  const accessToken = jwt.sign(
    {
      userId: user.id,
      refreshToken: refreshToken,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10d",
    }
  );

  res.cookie("token", accessToken, {
    httpOnly: true,
    maxAge: 1000 * 3600 * 24 * 10,
    sameSite: true,
    secure: true,
  });
  return res.send(JSON.stringify(req?.user));
};
