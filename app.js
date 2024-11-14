import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import session from "express-session";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import logout from "./routes/logout.js";
import patients from "./routes/patients.js";
import salleattente from "./routes/salleattente.js";
import employees from "./routes/employees.js";
import medicaments from "./routes/medicaments.js";
import rendezvous from "./routes/rendezvous.js";
import consultations from "./routes/consultations.js";
import historique_medical from "./routes/historique_medical.js";
import passport from "./passport.js";
import pool from "./db _config.js";



// Load environment variables
dotenv.config();

// Start express app
const app = express();
const port = process.env.PORT;

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 86400000 }, // 24 hours
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes #######################################################################

// Login
app.use('/login', login);

// Signup
app.use('/signup', signup);

// Logout
app.use('/logout', logout);

// Patients
app.use('/patients', patients);

// Salle d'attente
app.use('/salleattente', salleattente);
// Employees
app.use('/employees', employees);
// Medicaments
app.use('/medicaments', medicaments);


// Rendez-vous
app.use('/rendezvous', rendezvous);

// Consultations
app.use('/consultations', consultations);

// Historique médical
app.use('/historique_medical', historique_medical);


// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
