
document.addEventListener("DOMContentLoaded", () => {
    fetch('/fetch/user-teams')
        .then(response => response.json())
        .then(teams => {
            const teamContainer = document.getElementById('user-teams-list');
            if (teams.length === 0) {
                teamContainer.appendChild(document.createElement("p")).textContent = "Not currently in a team.";
            } else {
                teams.forEach(team => {
                // Create a link for the entire team element
                const teamLink = document.createElement('a');
                teamLink.href = `/team/${team.TeamID}`;  // Set the link to the team page URL
                teamLink.classList.add('team-link');  // Optional: You can add a class to style the link

                // Create the team container (this is now inside the link)
                const teamElement = document.createElement('div');
                teamElement.classList.add('team');

                // Add team name and ID
                const teamName = document.createElement('h3');
                teamName.textContent = `${team.TeamID} ${team.TeamName}`;
                teamElement.appendChild(teamName);

                // Add team leader (captain)
                const teamcaptain = document.createElement('p');
                teamcaptain.textContent = `Team Leader: ${team.Username}`;
                teamcaptain.classList.add("captain");
                teamElement.appendChild(teamcaptain);

                // Add team description
                const description = document.createElement('p');
                description.textContent = team.Description ? team.Description : "No description available";
                description.classList.add("description");
                teamElement.appendChild(description);
                teamLink.appendChild(teamElement);
                teamContainer.appendChild(teamLink);
                });
            }
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('user-teams-list').innerHTML = '<p>Failed to load teams.</p>';
        });
});
