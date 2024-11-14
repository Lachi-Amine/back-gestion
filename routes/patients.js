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
      const result = await pool.query("SELECT * FROM patients");
      res.status(200).json(result.rows);
      console.log("GET /patients");
    } catch (error) {
      res.status(500).send("Error retrieving patients");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

route.get ('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM patients WHERE id = $1", [id]);
      if (result.rows.length > 0) {
        const patient = result.rows[0];
        res.status(200).json(patient);
        console.log(`GET /patients/${id}`);
      } else {
        res.status(404).send("Patient not found");
      }
    } catch (error) {
      res.status(500).send("Error retrieving patient data");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

route.delete('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.params.id;
      await pool.query("DELETE FROM patients WHERE id = $1", [id]);
      res.status(200).send(`Patient deleted with ID: ${id}`);
      console.log("DELETE /patients");
    } catch (error) {
      res.status(500).send("Error deleting patient");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

  
  export default route;