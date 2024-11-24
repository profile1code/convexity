const express = require('express');
const session = require('express-session');
const router = express.Router();
const db = require('./db-connector');
const bcrypt = require('bcrypt');


const path = require('path');
const fs = require('fs');

folderPath = '../public/secure'
filePaths = fs.readdirSync(folderPath).map(file => `${file}`);


function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    }
    else {
        const matchingFile = filePaths.find(filePath => req.url === `/${path.basename(filePath)}`);
        //console.log(matchingFile);
        //console.log(req.url);
        if (matchingFile) {
            res.redirect('./signin.html');
        }
        else {
            next();
        }
    }
    
}

module.exports = isLoggedIn

