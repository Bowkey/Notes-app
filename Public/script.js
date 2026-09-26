const postBtn = document.querySelector("#post-btn");
const allNotesBtn = document.querySelector("#all-notes-btn");
const postField = document.querySelector("#post-field");
const allNotesField= document.querySelector("#allnotes-field");
const getNotes = document.getElementById("get-note");
const notesByAuthor = document.getElementById("notes-by-author");

const authorNameSearch = document.getElementById("get-note-by-author-name");

postBtn.addEventListener("click", ()=>{
  postField.style.display = "block";
  allNotesField.style.display = "none";
  notesByAuthor.style.display = "none";
})
allNotesBtn.addEventListener("click", ()=>{
  postField.style.display = "none";
  notesByAuthor.style.display = "none";
  allNotesField.style.display = "block";
})

authorNameSearch.addEventListener('click', ()=>{
  postField.style.display = "none";
  allNotesField.style.display = "none";
    notesByAuthor.style.display = "block";

});

const securityBox = document.getElementById("security-box")
const notesApp =document.getElementById("notes-app")
const passBtn = document.getElementById("pass-btn");
const passInput = document.getElementById("pass-input"); // Get the element, not the value yet

passBtn.addEventListener("click", () => {
    // Get the current value at the moment of the click
    const passKey = passInput.value;

    if (passKey == 5050) {
        
        securityBox.style.display = 'none';
        notesApp.style.display= 'block';
    } else {
        // Use an else block so this only runs if the PIN is wrong
        alert("Incorrect Pin");
        passInput.value="";
    }
});