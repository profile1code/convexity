const express = require('express');   
const app = express();
const PORT = 80;
const db = require('./db-connector');

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data
app.use(express.json()); // Parses JSON bodies

app.use(express.static('../public'));

// Start the server
app.listen(PORT, () => {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});