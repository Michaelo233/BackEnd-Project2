import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController"

const ticketRouter: Router = express.Router();

ticketRouter.get("/tickets", ticketController.getAllTickets);
ticketRouter.get("/tickets/:id/urgency", ticketController.getTicketUrgency);

export default ticketRouter