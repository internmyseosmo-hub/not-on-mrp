import express from "express";
import { submitContactForm, getAllContacts, deleteContact } from "../controllers/contact.Controller.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllContacts);
router.delete("/:id", deleteContact);

export default router;
