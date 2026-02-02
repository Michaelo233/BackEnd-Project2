export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
    ticketAge?: number;
    urgencyScore?: number;
    urgencyLevel?: string;
}