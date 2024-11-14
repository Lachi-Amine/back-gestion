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

route.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const result = await pool.query("SELECT * FROM medicaments");
        res.status(200).json(result.rows);
        console.log("GET /medicaments");
      } catch (error) {
        res.status(500).send("Error retrieving medicaments");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  });

  route.post("/", async (req, res) => {
    if (req.isAuthenticated()) {
      const { nom, type, forme, dosage, quantite } = req.body;
      try {
        await pool.query("INSERT INTO medicaments (nom, type, forme, dosage, quantite) VALUES ($1,$2,$3,$4,$5)", [nom, type, forme, dosage, quantite]);
        res.status(201).send("Medicament added to the medicaments list");
        console.log("POST /medicaments");
      } catch (error) {
        res.status(500).send("Error adding medicament");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  });
  
  route.delete("/:id", async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        const id = req.params.id;
        await pool.query("DELETE FROM medicaments WHERE id = $1", [id]);
        res.status(200).send(`Medicament deleted with ID: ${id}`);
        console.log("DELETE /medicaments");
      } catch (error) {
        res.status(500).send("Error deleting medicament");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  });
  
  export default route;