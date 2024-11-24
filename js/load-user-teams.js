
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded")
    fetch('/fetch/user-teams')
        .then(response => response.json())
        .then(teams => {
            const teamContainer = document.getElementById('user-teams-list');
            if (teams.length === 0) {
                teamContainer.innerHTML = '<p>Not currently in a team.</p>';
            } else {
                teams.forEach(team => {
                    const teamElement = document.createElement('div');
                    teamElement.classList.add('team');
                    teamElement.innerHTML = `
                        <h3>${team.TeamID} ${team.TeamName} ${team.Username}</h3>
                    `;
                    teamContainer.appendChild(teamElement);
                });
            }
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('user-teams-list').innerHTML = '<p>Failed to load teams.</p>';
        });
});

