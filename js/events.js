const dialog = document.getElementById("add-event-dialog");
const dialogButton = document.getElementById("add-button");
const submit = document.getElementById("event-submit");
const cancelbutton = document.getElementById("event-cancel");

document.addEventListener("DOMContentLoaded", () => {
  fetch(`/fetch/user-events`)
        .then(response => response.json())
        .then(events => {
            const eventContainer = document.getElementById('events-list');
            eventContainer.innerHTML = "";
            if (events.length === 0) {
                eventContainer.appendChild(document.createElement("p")).textContent = "No events currently available.";
            } else {
                
                events.forEach(event => {
                  console.log(event);
                  eventContainer.innerHTML += `
                  <div class="event-card">
                    <div class="event-content">
                      <div class="event-title">
                        ${event.EventName}
                      </div>
                      <div class="time-and-team">
                        <div class="time">
                          ${event.StartTime} - ${event.EndTime}
                        </div>
                        <div class="team">
                          ${event.TeamName}
                        </div>
                      </div>
                    </div>
                  </div>
                  `
                });
            }
        })
        .catch(err => {
            console.error('Error fetching teams:', err);
            document.getElementById('events-list').innerHTML = '<p>Failed to load teams.</p>';
        });
});



cancelbutton.addEventListener('click', () => {
  dialog.close();
});

dialogButton.addEventListener('click', () => {
  dialog.showModal();
});

const team_select = document.getElementById("team-select");
fetch("/fetch/teams").then(
  data => data.json()
).then(teams => {
  for (const team of teams) {
      const val = team_select.appendChild(document.createElement('option'));
      val.value = team.TeamID;
      val.textContent = team.TeamName;
  }
});
