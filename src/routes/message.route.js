import express from "express";
import trimRequest from "trim-request";
import authMiddlewares from "../midllewares/authMiddlewares.js";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
// import router from "./conversation.route";
const router = express.Router();

 router.route('/').post(trimRequest.all,authMiddlewares,sendMessage)
 router.route('/:convo_id').get(trimRequest.all,authMiddlewares,getMessage)
 export default router;