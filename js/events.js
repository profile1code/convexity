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
