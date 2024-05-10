//@ts-nocheck
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google_redirect",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const user = await prisma.user.upsert({
        where: {
          email: profile.emails[0].value,
        },
        update: {},
        create: {
          name: profile.displayName,
          slug:
            profile.displayName.toLowerCase().split(" ").join("") +
            "." +
            profile.id,
          avatar: profile.photos[0].value,
          email: profile.emails[0].value,
          refreshToken: [],
        },
      });
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
