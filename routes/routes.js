import { Router } from "express";
import { getAllNotes, postNote, getNote, deletNote, updateNote } from "../controllers/notesController.js";
const router = Router();


router.get("/", getAllNotes)
router.get("/:title", getNote)
router.post("/", postNote);
router.put("/:id", updateNote);
router.delete("/:id", deletNote);

export default router;