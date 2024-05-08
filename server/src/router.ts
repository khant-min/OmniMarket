import express, { Router } from "express";
import CustomerAuthRouter from "./customer/auth/auth.route.ts";

const AppRouter: Router = express.Router();

AppRouter.use("/auth/user", CustomerAuthRouter);

export default AppRouter;
