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

route.post("/",async (req, res) => {
    const { nom, prenom, email, role, date_de_recrutement, numberphone, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("INSERT INTO employees (nom, prenom, email, role, date_de_recrutement, numberphone, password) VALUES ($1,$2,$3,$4,$5,$6,$7)", [nom, prenom, email, role, date_de_recrutement, numberphone, hashedPassword]);
      res.status(201).send("Employee added to the employees list");
      console.log("POST /signup");
    } catch (error) {
      res.status(500).send("Error adding employee");
    }
  });


  export default route;