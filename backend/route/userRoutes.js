import express from "express";
import { authentication } from "../middleware/authentication.js";
import { getMyInfo } from "../controller/userController.js";

const router = express.Router();

router.get("/me", authentication, getMyInfo)
// router.get("/me", getMyInfo)

export default router;