import express, { Router } from "express";
import * as ticketController from "../controllers/ticketController"

const ticketRouter: Router = express.Router();

ticketRouter.get("/tickets", ticketController.getAllTickets);

export default ticketRouter