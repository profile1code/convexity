const express = require('express');   
const app = express();
const path = require('path');
const PORT = 80;
const db = require('./db-connector');

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json()); // Parses JSON bodies

app.use(express.static('../public'));
app.use(express.static('../js'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});