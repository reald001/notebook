const newNotesBlock = document.querySelector(".added-notes");
const addBtn = document.getElementById("add");
const noteInput = document.querySelector(".note-input");
const notes = [];
let removeNoteBtn
if (localStorage.length) {
  for (let i = 0; i < localStorage.length; i++) {
    notes.push(localStorage.getItem(localStorage.key(i)));
  }
  setList();
}

function setList() {
  newNotesBlock.innerHTML = "";
  for (let el of notes) {
    newNotesBlock.insertAdjacentHTML(
      "beforeEnd",
      `<p class="added-note">&#9745; ${el} <span class="note-remove">&#10006;</span></p>`
    );
  }
  removeNoteBtn = document.getElementsByClassName("note-remove");
  for(let idx = 0; idx < removeNoteBtn.length; idx++){
    removeNoteBtn[idx].addEventListener("click", function(){
      removeNote(idx)
    })
  }
  
}
function addNote() {
  let text = noteInput.value;
  if (text.length) {
    noteInput.value = "";
    notes.push(text)
    localStorage.setItem(`note-${notes.length}`, text);
  }
  setList();
}
function removeNote(i) {
  notes.splice(i, 1)
  localStorage.clear()
  for(let i = 0; i < notes.length; i++){
    localStorage.setItem(`note-${i+1}`, notes[i]);
  }
  setList()
}
addBtn.addEventListener("click", function () {
  addNote();
});
noteInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    addNote();
  }
});
