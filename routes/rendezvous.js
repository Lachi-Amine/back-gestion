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
      const result = await pool.query("SELECT * FROM rendez_vous");
      res.status(200).json(result.rows);
      console.log("GET /rendez_vous");
    } catch (error) {
      res.status(500).send("Error retrieving rendez_vous");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

route.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const { id_patient, id_employee, date, heure } = req.body;
    try {
      await pool.query("INSERT INTO rendez_vous (id_patient, id_employee, date, heure) VALUES ($1,$2,$3,$4)", [id_patient, id_employee, date, heure]);
      res.status(201).send("Rendez_vous added to the rendez_vous list");
      console.log("POST /rendez_vous");
    } catch (error) {
      res.status(500).send("Error adding rendez_vous");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

route.delete("/:id", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const id = req.params.id;
      await pool.query("DELETE FROM rendez_vous WHERE id = $1", [id]);
      res.status(200).send(`Rendez_vous deleted with ID: ${id}`);
      console.log("DELETE /rendez_vous");
    } catch (error) {
      res.status(500).send("Error deleting rendez_vous");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

  
  export default route;