const express = require('express');
const router = express.Router();
const db = require('./db-connector');
const bcrypt = require('bcrypt');

// Route to handle form submission
router.post('/submit-signup', async (req, res) => {
    const { username, password, email } = req.body;
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the hashed password into the Passwords table
        const passwordQuery = 'INSERT INTO Passwords (Password) VALUES (?)';
        db.query(passwordQuery, [hashedPassword], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error inserting password');
            }

            // Get the generated password ID
            const passwordId = result.insertId;

            // Insert the user into the Users table with the PasswordId
            const userQuery = 'INSERT INTO Users (Username, Email, PasswordID) VALUES (?, ?, ?)';
            db.query(userQuery, [username, email, passwordId], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error inserting user');
                }
                db.query('SELECT Users.Username, Passwords.Password FROM Users JOIN Passwords ON Users.PasswordID = Passwords.PasswordID;', (err, results) => {
                    if (err) {
                        console.log('Error fetching users and passwords:', err);
                        return;
                    }
                    console.log('Users and Passwords:', results);
                });
                res.status(200).send('User and password inserted successfully');
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error hashing password');
    }
});

module.exports = router;