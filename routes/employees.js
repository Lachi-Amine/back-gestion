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

route.get('/', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await pool.query("SELECT id, nom, prenom, email, role, date_de_recrutement, numberphone FROM employees");
      res.status(200).json(result.rows);
      console.log("GET /employees");
    } catch (error) {
      res.status(500).send("Error retrieving employees");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});


route.post('/', async (req, res) => {
  if (req.isAuthenticated()) {
    const { nom, prenom, email, role, date_de_recrutement, numberphone } = req.body;
    try {
      const result = await pool.query("SELECT * FROM employees WHERE email = $1", [email]);
      if (result.rows.length > 0) {
        res.status(400).send('Employee already exists');
      } else {
        await pool.query("INSERT INTO employees (nom, prenom, email, role, date_de_recrutement, numberphone) VALUES ($1, $2, $3, $4, $5, $6)", [nom, prenom, email, role, date_de_recrutement, numberphone]);
        res.status(201).send('Employee added to the employees list');
        console.log('POST /employees');
      }
    } catch (error) {
      res.status(500).send('Error adding employee');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

route.get('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.params;
    try {
      const result = await pool.query("SELECT * FROM employees WHERE id = $1", [id]);
      if (result.rows.length > 0) {
        const employee = result.rows[0];
        res.status(200).json(employee);
        console.log(`GET /user/${id}`);
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (error) {
      res.status(500).send('Error retrieving employee data');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

route.delete('/:id', async (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM employees WHERE id = $1", [id]);
      res.status(200).send('Employee deleted');
      console.log(`DELETE /employees/${id}`);
    } catch (error) {
      res.status(500).send('Error deleting employee');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

route.put ('/:id', async (req, res) => {
if (req.isAuthenticated()) {
  const { id } = req.params;
  const { nom, prenom, email, role, date_de_recrutement, numberphone } = req.body;
  try {
    await pool.query("UPDATE employees SET nom = $1, prenom = $2, email = $3, role = $4, date_de_recrutement = $5, numberphone = $6 WHERE id = $7", [nom, prenom, email, role, date_de_recrutement, numberphone, id]);
    res.status(200).send(`Employee modified with ID: ${id}`);
    console.log(`PUT /employees/${id}`);
  } catch (error) {
    res.status(500).send('Error modifying employee');
  }
}
else {
  res.status(401).send('Unauthorized');
}});




export default route;