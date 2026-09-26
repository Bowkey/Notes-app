
const submitBtn = document.getElementById("submit-post");
const titleInput = document.getElementById("title-name");
const notesContent = document.getElementById("notes-content");
const getAllNotes = document.getElementById("all-notes-btn");
const notesContainer = document.getElementById("notes-container");

submitBtn.addEventListener("click", async () => {
  console.log("clicked")
  const data = {
    title: titleInput.value.trim(),
    notesBody: notesContent.value.trim()
  }
  if (!data.title || !data.notesBody) {
    alert("Please enter your name and a note.");
    return;
  }
  if (data.notesBody.length <= 1000) {

    try {
      const response = await fetch("/notes",
        {
          method: "POST",

          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)

        });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to create note");
      }
      console.log("Successfully submitted", result);
      titleInput.value = "";
      notesContent.value = "";
    } catch (error) {
      console.error("Unable to submit note:", error.message)
    }
  }

  else {
    alert("Text body should not exceed 1000 characters")
  }
}
)

// This button retrieves all notes from the database
getAllNotes.addEventListener("click", async () => {
  try {
    const res = await fetch("/notes");
    const allNotes = await res.json();
    console.log(allNotes)
    // Mapping through notes and adding a Delete button with a data-id attribute
    notesContainer.innerHTML = allNotes.map(note => `
      <div class="note-item" id="note-${note._id}" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: #fff;">
        <p><strong>title:</strong> ${note.title}</p>
        <p style=""><strong>Note:</strong> ${note.notesBody}</p>
        <p><small>Created: ${new Date(note.createdAt).toLocaleString()}</small></p>
        <button class="delete-btn" data-id="${note._id}" style="background-color: #ff4d4d; color: white; border: none; padding: 8px 12px; cursor: pointer; border-radius: 4px; margin-top: 10px;">
          Delete 🗑️
        </button>
      </div>
    `).join("");

  } catch (error) {
    console.error(error.message);
    alert("Error fetching notes");
  }
});

// Event Delegation for Delete Buttons
notesContainer.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const noteId = event.target.getAttribute("data-id");

    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`/notes/${noteId}`, { method: "DELETE" });
      if (response.ok) {
        // Remove the specific note from the screen
        document.getElementById(`note-${noteId}`).remove();
      } else {
        alert("Failed to delete the note.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  }
});