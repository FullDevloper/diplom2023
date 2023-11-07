import express from "express"
import authRoute from "./auth.route.js"
import ConversationRoutes from "./conversation.route.js"
const router =express.Router();
router.use("/auth",authRoute)
router.use("/conversation",ConversationRoutes);
export default router