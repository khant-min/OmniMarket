import express, { Express, Router } from "express";
import passport from "passport";
import "./Strategy/googleStrategy.ts";

import * as AuthController from "./auth.controller.ts";

const AuthRouter: Router = express.Router();

AuthRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

AuthRouter.get(
  "/google_redirect",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/api/v1/auth/success");
  }
);

AuthRouter.get("/failed", (req, res) => {
  console.log("User is not authenticated");
  res.send("Failed");
});

AuthRouter.get("/success", AuthController.login);

export default AuthRouter;
