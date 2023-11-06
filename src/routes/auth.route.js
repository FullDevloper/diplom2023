import express from "express"
// import trimRequest from "trim"
import {login, register,logout,refreshToken} from "../controllers/auth.controllers.js"
const router = express.Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/refreshtoken").post(refreshToken)
router.route("/logout").post(logout)
export default router  