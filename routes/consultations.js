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

route.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const result = await pool.query("SELECT * FROM consultations");
        res.status(200).json(result.rows);
        console.log("GET /consultations");
      } catch (error) {
        res.status(500).send("Error retrieving consultations");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  });
  
  export default route;





