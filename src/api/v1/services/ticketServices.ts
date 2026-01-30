import { Ticket } from "../models/ticketModel";
import { tickets } from "src/data/ticketData";

export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
} 