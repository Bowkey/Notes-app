import Note from "../model/notesSchema.js"


//This Function retrieves all notes from the database
export const getAllNotes = async (req, res)=>{
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Couldn't fetch notes:", error.message);
    res.status(500).json({ message: "Unable to fetch notes" });
  }
}
//This function Posts a note
export const postNote = async (req, res)=>{
  try {
    const {author, notesBody} =req.body;
    const note = await Note.create({author, notesBody})
    res.status(201).json({message:"Notes Created", note});
  } catch (error) {
    console.error("Couldn't create a note:", error.message);
    res.status(400).json({ message: error.message });
  }
}

//This Function retrieves all the notes from the database
// export const getNote = async (req, res)=>{
//   const note = await Note.findById(req.params.id);
// console.log(note);

// }

export const getNote = async (req, res) => {
  try {
    const notes = await Note.find({ author: req.params.author }).sort({ createdAt: -1 });

    if (notes.length === 0) {
      return res.status(404).json({ error: "No notes found for this author" });
    }
    return res.status(200).json({ message: "Notes fetched successfully", notes });

  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch notes" });
  }
};

// This part finds and delete note by id
export const deletNote= async (req, res)=>{
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if(!note){
      return res.status(404).json({error: "No note to be deleted"})
    }
    return res.status(200).json({message: "Delete note succes", note})
  } catch (error) {
    console.error("Couldn't delete note:", error.message);

    if(error.name === "CastError"){
      return res.status(400).json({message: "Invalid note id"});
    }
    return res.status(400).json({message: "Couldn't Delete Note"});

  }

}

export const updateNote= async(req, res)=>{

  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body,{

      // Mongoose 9: `new: true` is deprecated in favour of returnDocument
      returnDocument: "after",
      runValidators: true
    });
    if(!note){
      return res.status(404).json({message: "Note not found"});
    }
    return res.status(200).json({message: "note update success", note})
  } catch (error) {
    console.error("Couldn't update note:", error.message);

    // An invalid id (e.g. not a 24 character ObjectId) is a client error
    if(error.name === "CastError"){
      return res.status(400).json({message: "Invalid note id"});
    }
    return res.status(400).json({message: "oops! something went wrong"})
  }

}