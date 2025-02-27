import { Router } from "express";
import { login } from "../controllers/usuario_controller.js";

const router = Router();



router.post("/login", login);

export default router;