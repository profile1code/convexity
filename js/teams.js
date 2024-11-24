const express = require('express');
const router = express.Router();
const db = require('./db-connector');

router.post('/create/team', function(req, res) {
    const { teamName } = req.body;
    const userID = req.session.user.userId;  // Assuming the user ID is stored in the session
    const checkTeamQuery = "SELECT * FROM Teams WHERE teamName = ?";
    db.query(checkTeamQuery, [teamName], function(err, results) {
        if (err) {
            return res.status(500).send("Database error");
        }

        if (results.length > 0) {
            return res.status(400).send("Team name already exists");
        }

        // If the team doesn't exist, insert the new team
        const addTeamQuery = "INSERT INTO Teams (TeamName, TeamLeaderID) VALUES (?, ?)";
        db.query(addTeamQuery, [teamName, userID], function(err, result) {
            if (err) {
                return res.status(500).send("Error creating team");
            }

            // Get the newly created team ID
            const teamID = result.insertId;

            const addUserToTeamQuery = "INSERT INTO UserTeams (userID, teamID) VALUES (?, ?)";
            db.query(addUserToTeamQuery, [userID, teamID], function(err) {
                if (err) {
                    return res.status(500).send("Error linking user to team");
                }

                res.redirect('/user-teams.html');
            });
        });
    });
});

router.get('/fetch/user-teams', (req, res) => {
    // Assuming you're using session for user data
    console.log("fetching teams");
    const userID = req.session.user.userId;
    if (!userID) {
        return res.status(401).send('User not logged in');
    }

    db.query('SELECT * FROM UserTeams NATURAL JOIN Teams INNER JOIN Users ON Teams.TeamLeaderID=Users.UserID WHERE UserTeams.UserID = ?', [userID], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error retrieving events');
        }
        console.log(results);
        res.json(results);
    });
    
});

module.exports = router;