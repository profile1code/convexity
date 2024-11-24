document.addEventListener("DOMContentLoaded", function() {
    // Create the top navigation bar
    const eventOutline = `
        <div class="event">
            
        </div>
    `;

    // Insert the top navigation bar into the body at the start
    const body = document.body;
    const divTopNav = document.createElement('div');
    divTopNav.innerHTML = topNav;
    body.insertBefore(divTopNav, body.firstChild);  // Adds the topnav as the first element in the body

});

// server.js (or app.js)
app.get('/fetch/user-events', (req, res) => {
    // Assuming you're using session for user data
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send('User not logged in');
    }

    db.query('SELECT * FROM events WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving events');
        }
        return res.json(results); // Send events as JSON
    });
});