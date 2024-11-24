const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('./db-connector');
const bcrypt = require('bcrypt');

// Log in route
router.post('/submit-login', (req, res, next) => {

    const { username, password } = req.body;
    
    const query = 'SELECT * FROM Users WHERE Username = ?';
    db.query(query, [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }
        
        const user = results[0];
        
        const getPassword = 'SELECT Password FROM Passwords WHERE PasswordID = ?';
        db.query(getPassword, [user.PasswordID], (err, passwordResults) => {
            if (err || results.length === 0) {
                return res.status(400).send('Could not get user password');
            }
            bcrypt.compare(password, passwordResults[0].Password, (err, match) => {
                if (err || !match) {
                    return res.status(400).send('Invalid username or password');
                }
                
                req.session.user = {
                    username: user.Username,
                    userId: user.UserID
                };
                res.cookie('loggedin', 'yes');
                res.redirect('/index.html');
            });
        });
    });
});

module.exports = router;