import express from "express";
import { registerController, loginController } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2ODU0NzUxMzUsImV4cCI6MTY4NTQ3ODczNX0.k1ky6kKsX0z-M1B-uZ9s7oXRl9xs0VTQkaJEZvUSI_E