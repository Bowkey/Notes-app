import mongoose from "mongoose"
import conncetDB from "../db.js"

const notesSchema = new mongoose.Schema({
  author: {
    type: String,
    maxLength: [15, "Name cannot be more than 15 characters"],
    required: [true, "Author's Name is required"]
  },
  notesBody: {
    type: String,
    maxLength: [200, "Maximum Character is 200"],
    required: [true, "write a Note"]
  }
},
  { timestamps: true }

)

const Note = mongoose.model("Notes", notesSchema)

export default Note;