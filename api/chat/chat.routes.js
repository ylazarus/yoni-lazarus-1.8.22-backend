const express = require("express")
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware")
const {
  getChats,
  getChatById,
  addChat,
  updateChat,
  removeChat,
} = require("./chat.controller")
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get("/", getChats)
router.get("/:id", getChatById)
router.post("/", requireAuth, addChat)
// router.put("/:id", requireAuth, requireAdmin, updateChat)
router.delete("/:id", requireAuth, requireAdmin, removeChat)

module.exports = router
