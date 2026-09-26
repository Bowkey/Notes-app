import mongoose from "mongoose"
import conncetDB from "../db.js"

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [15, "Name cannot be more than 15 characters"],
    required: [true, "title's Name is required"]
  },
  notesBody: {
    type: String,
    maxLength: [1000, "Maximum Character is 1000"],
    required: [true, "write a Note"]
  }
},
  { timestamps: true }

)

const Note = mongoose.model("Notes", notesSchema)

export default Note;