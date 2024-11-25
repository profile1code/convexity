document.addEventListener("DOMContentLoaded", () => {
    const teamID = window.location.pathname.split('/').pop();
    fetch(`/fetch/team/${teamID}`)
        .then(response => response.json())
        .then(team => {
            team = team[0];
            console.log(team);
            const teamContainer = document.getElementById('team-info');
                // Create the team container (this is now inside the link)
                const teamElement = document.createElement('div');
                teamElement.classList.add('team');

                // Add team name and ID
                const teamName = document.createElement('h2');
                teamName.textContent = `${team.TeamName}'s Home`;
                teamElement.appendChild(teamName);

                // Add team leader (captain)
                const teamcaptain = document.createElement('h3');
                teamcaptain.textContent = `Team Leader: ${team.Username}`;
                teamcaptain.classList.add("captain");
                teamElement.appendChild(teamcaptain);

                // Add team description
                const description = document.createElement('p');
                description.textContent = team.Description ? team.Description : "No description available";
                description.classList.add("description");
                teamElement.appendChild(description);
                
                const joinButton = document.createElement('button');
                    joinButton.textContent = 'Join';
                    joinButton.addEventListener('click', () => {
                        fetch('/join-team', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ teamID: team.TeamID }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                if (!data.success) {
                                    alert(`Failed to join team: ${data.message}`);
                                } 
                            })
                            .catch(error => {
                                console.error('Error:', error);
                                alert('An error occurred while sending the join request.');
                            });
                    });
                    teamElement.appendChild(joinButton);

                teamContainer.appendChild(teamElement);

                
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('team-info').innerHTML = '<p>Failed to load teams.</p>';
        });
});