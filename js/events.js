const dialog = document.getElementById("add-event-dialog");
const dialogButton = document.getElementById("add-button");
const submit = document.getElementById("event-submit");
const cancelbutton = document.getElementById("event-cancel");

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
      val.value = team.TeamName;
      val.textContent = team.TeamName;
  }
});
