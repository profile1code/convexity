
document.addEventListener("DOMContentLoaded", () => {
    fetch('/fetch/user-teams')
        .then(response => response.json())
        .then(teams => {
            const teamContainer = document.getElementById('user-teams-list');
            if (teams.length === 0) {
                teamContainer.appendChild(document.createElement("p")).textContent = "Not currently in a team.";
            } else {
                teams.forEach(team => {
                    const teamElement = document.createElement('div');
                    teamElement.classList.add('team');
                    teamElement.appendChild(document.createElement('h3')).textContent = `${team.TeamID} ${team.TeamName}`;
                    const description = team.Description ? team.Description: "No description available"
                    teamElement.appendChild(document.createElement('h3')).textContent = `${team.TeamID} ${team.TeamName} ${team.Username} ${description}`;
                    const teamcaptain = teamElement.appendChild(document.createElement('p'));
                    teamcaptain.textContent = `${team.Username}`;
                    teamcaptain.classList.add("captain");
                    teamContainer.appendChild(teamElement);
                    
                });
            }
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('user-teams-list').innerHTML = '<p>Failed to load teams.</p>';
        });
});
