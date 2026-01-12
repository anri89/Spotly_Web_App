import express from "express";
import { addSpotPage, createSpot } from "../controllers/spotController.js";
import { getFriendsPage, postFindMatches } from "../controllers/userController.js";

const router = express.Router();

router.get("/add", addSpotPage);
router.post("/add", createSpot);


router.get("/friends", getFriendsPage);
router.post("/friends/matches", postFindMatches);

export default router;
