const express = require('express');   
const session = require('express-session');
const app = express();
const path = require('path');
const PORT = 80;
const fs = require('fs');

folderPath = '../public/secure'
filePaths = fs.readdirSync(folderPath).map(file => `/${file}`);


app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json()); // Parses JSON bodies

app.use(session({
    secret: 'thisisatestkey', // Use a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // For development, you can set secure: false. In production, use https.
}));

const securejs = require('./secure-pages.js');
app.use(securejs);

//app.use(express.static('../public/secure'));
app.use(express.static('../public'));
app.use(express.static('../public/secure'));
app.use(express.static('../js'));

const signup = require('./signup.js');
const login = require('./login.js');
const teams = require('./teams.js');

app.use('/', signup);
app.use('/', login);
app.use('/', teams);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});