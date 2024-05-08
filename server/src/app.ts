import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import { pino } from "pino";
import AppRouter from "./router.ts";

const logger = pino({ name: "server start" });
const app: Express = express();

app.set("trust proxy", true);

// Middlewares
app.use(cors());
app.use(helmet());

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log(process.env.TEST);
  return res.send("Hello Ts gg");
});

app.use("/api/v1", AppRouter);

export { app, logger };
