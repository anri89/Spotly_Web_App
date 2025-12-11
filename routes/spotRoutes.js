import express from "express";
import { addSpotPage, createSpot, friendsPage } from "../controllers/spotController.js";

const router = express.Router();

router.get("/add", addSpotPage);
router.post("/add", createSpot);
router.get("/friends", friendsPage);

export default router;
