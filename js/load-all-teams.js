
function renderTeams() {
    const search = document.getElementById('all-team-search-bar').value;
    fetch(`/fetch/all-teams?query=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(teams => {
            const teamContainer = document.getElementById('all-teams-list');
            teamContainer.innerHTML = "";
            if (teams.length === 0) {
                teamContainer.appendChild(document.createElement("p")).textContent = "No teams currently available.";
            } else {
                
                teams.forEach(team => {
                    const teamElement = document.createElement('div');
                    teamElement.classList.add('team');
                
                    const teamInfo = document.createElement('h3');
                    const description = team.Description ? team.Description: "No description available"
                    teamElement.appendChild(document.createElement('h3')).textContent = `${team.TeamID} ${team.TeamName} ${team.Username} ${description}`;
                    teamElement.appendChild(teamInfo);
                
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
                });
            }
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('user-teams-list').innerHTML = '<p>Failed to load teams.</p>';
        });
}

