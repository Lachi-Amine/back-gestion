// passport.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "./db _config.js";

passport.use(new LocalStrategy({
  usernameField: 'email', // specify the field name for email
  passwordField: 'password' // specify the field name for password (optional, as it's already 'password' by default)
}, async function verify(email, password, done) {
  try {
    const result = await pool.query("SELECT email, password FROM employees WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;
      bcrypt.compare(password, storedPassword, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    } else {
      return done(null, false, { message: 'Incorrect email.' });
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const result = await pool.query("SELECT email FROM employees WHERE email = $1", [email]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

export default passport;
