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

route.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const { nom, prenom, date_naissance, sexe, telephone, p_nom, p_prenom } = req.body;
    try {
      const result = await pool.query("SELECT * FROM patients WHERE nom = $1 AND prenom = $2 AND date_naissance = $3 AND sexe = $4 AND telephone = $5 AND p_nom = $6 AND p_prenom = $7", [nom, prenom, date_naissance, sexe, telephone, p_nom, p_prenom]);
      if (result.rows.length > 0) {
        res.status(400).send("Patient already exists");
      } else {
        await pool.query("INSERT INTO patients (nom, prenom, date_naissance, sexe, telephone, p_nom, p_prenom) VALUES ($1,$2,$3,$4,$5,$6,$7)", [nom, prenom, date_naissance, sexe, telephone, p_nom, p_prenom]);
        res.status(201).send("Patient added to the patients list");
        console.log("POST /salleattente");
      }
    } catch (error) {
      res.status(500).send("Error adding patient");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});


route.delete("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.params.id;
      await pool.query("DELETE FROM salleattente WHERE id = $1", [id]);
      res.status(200).send(`Patient deleted with ID: ${id}`);
      console.log("DELETE /salleattente");
    } catch (error) {
      res.status(500).send("Error deleting patient from salleattente");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

route.get ('/:id ', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.params.id;
      const result = await pool.query("SELECT * FROM salleattente WHERE id = $1", [id]);
      res.status(200).json(result.rows);
      console.log("GET /salleattente");
    } catch (error) {
      res.status(500).send("Error getting patient from salleattente");
    }
  } else {
    res.status(401).send("Unauthorized");
  }});

route.post ("/:id ", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.params.id;
      await pool.query("INSERT INTO patients SELECT * FROM salleattente WHERE id = $1", [id]);
      res.status(201).send("Patient added to the patients list");
      console.log("POST /salleattente");
    } catch (error) {
      res.status(500).send("Error adding patient to patients");
    }
  } else {
    res.status(401).send("Unauthorized");
  }});

  
  export default route;