import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  getTicketsByUserId,
  getUserTickets,
  updateTicket,
} from "../controllers/ticket.controller.js";
import { authorizeRoles, verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.use(verifyToken);
router.post("/create", createTicket);
router.get("/all", authorizeRoles("ADMIN", "EXECUTIVE"), getAllTickets);
router.get("/:id", getTicketById);
router.get("/", getUserTickets);
router.get("/user/:id", getTicketsByUserId);
router.patch("/:id", updateTicket);
router.delete("/:id", deleteTicket);

export default router;
