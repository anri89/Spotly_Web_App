import express from "express";
import { profilePage } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", profilePage);

export default router;
