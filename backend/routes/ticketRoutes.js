const express = require("express");
const {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
} = require("../controller/ticketController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// router.get("/", protect, getTickets);
// router.get("/:id", protect, getTicket);
// router.post("/", protect, addTicket);

router.route("/").get(protect, getTickets).post(protect, addTicket);
router.route("/:id").get(protect, getTicket).put(protect, updateTicket);

//Re-Routing towards /api/ticket/:ticketId/note
router.use("./:ticketId/note", require("./notesRoutes"));

module.exports = router;
