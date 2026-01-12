import { Router } from "express";
import {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  postLogout,
  getProfile,
} from "../controllers/userController.js";

const router = Router();

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.post("/logout", postLogout);
router.get("/profile", getProfile);

export default router;
