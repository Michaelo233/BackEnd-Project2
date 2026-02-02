import { Ticket } from "../models/ticketModel";
import { tickets, ticketAge, urgencyScore, urgencyLevel } from "../../../data/ticketData";

// Service to get all tickets
export const getAllTickets = async (): Promise<Ticket[]> => {
    // Return a deep clone to avoid direct mutation
    return structuredClone(tickets);
} 

// service to get ticket urgency
export const getTicketUrgency = async (id: number): Promise<Ticket> => {
    const ticket: Ticket | undefined = tickets.find(ticket => ticket.id === id)
    if(!ticket) {
        throw new Error(`Event with ID ${id} not found`);
    }

    // Adds ticketage, urgencyscore and urgency level to the ticket
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

// serrvice to create new tickets
export const createTicket = async (ticketData: {
    title: string;
    description: string;
    priority: string;

}): Promise<Ticket> => {

    // Create a new ticket with default values for fields not provided
    const newTicket: Ticket = {
        id: tickets.length + 1,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date().toISOString() 
    };

    tickets.push(newTicket);
    return structuredClone(newTicket)
};

// service to update a ticket
export const updateTicket = async (
    id: number,
    ticketData: Pick<Ticket, "priority" | "status">
): Promise<Ticket> => {
    const index: number = tickets.findIndex((ticket: Ticket) => ticket.id === id);

    if (index === -1) {
        throw new Error(`Ticket with ID ${id} not found`);
    }

    // Update the ticket with the provided fields
    tickets[index] = {
        ...tickets[index],
        ...ticketData,
        updatedAt: new Date().toISOString(),
    };

    return structuredClone(tickets[index]);
};

// service to delete ticket
export const deleteTicket = async (id: number): Promise<void> => {
    const index: number = tickets.findIndex((ticket: Ticket) => ticket.id === id)

    if (index === -1) {
        throw new Error (`Ticket with ID ${id} not found.`);
    }

    tickets.splice(index, 1);
};