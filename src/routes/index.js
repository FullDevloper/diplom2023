import express from "express"
import authRoute from "./auth.route.js"
import userRoute from "./user.route.js"
import ConversationRoutes from "./conversation.route.js"
import MessageRoutes from "./message.route.js"
const router =express.Router();
router.use("/auth",authRoute)
router.use("/user",userRoute)
router.use("/conversation",ConversationRoutes);
router.use("/message",MessageRoutes)
export default router