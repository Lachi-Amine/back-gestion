import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db _config.js";


const route=express.Router();

route.get('/', (req, res) => {
  
    res.status(200).send("Logged out");
  });


  
  export default route;