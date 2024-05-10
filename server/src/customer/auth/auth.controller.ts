import { User } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "../../lib/response.ts";

export const login = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    const refreshToken = jwt.sign(
      { id: user?.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    const accessToken = jwt.sign(
      {
        userId: user?.id,
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
    return res
      .status(StatusCodes.OK)
      .json(
        successResponse(StatusCodes.OK, "Success", { msg: "Log in success" })
      );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Error", {
        msg: "Log in fail",
      })
    );
  }
};
