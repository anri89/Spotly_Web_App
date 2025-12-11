import express from "express";
import { homePage, explorePage } from "../controllers/indexController.js";

const router = express.Router();

router.get("/", homePage);
router.get("/explore", explorePage);

export default router;
