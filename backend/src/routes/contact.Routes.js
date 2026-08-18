import express from "express";
import { submitContactForm, getAllContacts } from "../controllers/contact.Controller.js";

const router = express.Router();

router.post("/", submitContactForm);
router.get("/", getAllContacts);

export default router;
