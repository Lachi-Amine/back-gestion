import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db _config.js";


const route = express.Router();

route.post('/', (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err); // Handle error
    }
    if (!user) {
      return res.status(401).send(info.message); // Handle login failure
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); // Handle error
      }
      console.log("POST /login");
      return res.status(200).send("Logged in");
    });
  })(req, res, next);
});


export default route;