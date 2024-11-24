const express = require('express');
const router = express.Router();
const db = require('./db-connector');
const bcrypt = require('bcrypt');

// Route to handle form submission
router.post('/submit-signup', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the username already exists
        const usernameCheckQuery = 'SELECT * FROM Users WHERE Username = ?';
        db.query(usernameCheckQuery, [username], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error checking username');
            }

            if (results.length > 0) {
                // Username already exists, send response with error message
                console.log("Duplicate name");
                return res.send(`
                    <script>
                        alert('Username already exists. Please choose another.');
                        window.history.back();
                    </script>
                `);
                
            }

            // Proceed with inserting the user if the username is unique
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error hashing password');
                }

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

                        // Optional: Debug information
                        db.query('SELECT Users.Username, Passwords.Password FROM Users JOIN Passwords ON Users.PasswordID = Passwords.PasswordID;', (err, results) => {
                            if (err) {
                                console.log('Error fetching users and passwords:', err);
                                return;
                            }
                            console.log('Users and Passwords:', results);
                        });

                        res.redirect('/signin.html');
                    });
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.redirect('/signup.html');
    }
});

module.exports = router;