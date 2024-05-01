import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  return res.send(JSON.stringify(req?.user));
};
