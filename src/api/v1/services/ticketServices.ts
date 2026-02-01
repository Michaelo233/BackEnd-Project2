import { Ticket } from "../models/ticketModel";
import { tickets, ticketAge, urgencyScore, urgencyLevel } from "../../../data/ticketData";

export const getAllTickets = async (): Promise<Ticket[]> => {
    return structuredClone(tickets);
} 

export const getTicketUrgency = async (id: number): Promise<Ticket> => {
    const ticket = tickets.find(ticket => ticket.id === id)
    if(!ticket) {
        throw new Error(`Event with ID ${id} not found`);
    }
    const ticketUrgency: Ticket = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge: ticketAge(ticket.id),
        urgencyScore: urgencyScore(ticket.id),
        urgencyLevel: urgencyLevel(ticket.id),
    }

    return structuredClone(ticketUrgency)
}