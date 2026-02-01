import { Ticket } from "src/api/v1/models/ticketModel";

const ticketDate = (days: number): string => {
    const today = new Date();
    const date = new Date(today);
    date.setDate(date.getDate() - days);

    return date.toISOString();
}

export const tickets: Ticket[] = [
    {
        id: 1,
        title: "Update footer copyright year",
        description: "Footer still shows 2024",
        priority: "low",
        status: "open",
        createdAt: ticketDate(3)
    },

    {
        id: 2,
        title: "Profile picture upload slow",
        description: "Upload takes 30+ seconds",
        priority: "medium",
        status: "open",
        createdAt: ticketDate(2)
    },

    {
        id: 3,
        title: "Dashboard loading slowly",
        description: "Dashboard takes 10+ seconds to load",
        priority: "medium",
        status: "open",
        createdAt: ticketDate(6) 
    },
    
    {
        id: 4,
        title: "Password reset email delayed",
        description: "Reset emails taking over 30 minutes",
        priority: "high",
        status: "open",
        createdAt: ticketDate(5) 
    },
    
    {
        id: 5,
        title: "Export to PDF not working",
        description: "PDF export fails silently",
        priority: "high",
        status: "open",
        createdAt: ticketDate(9) 
    },
    
    {
        id: 6,
        title: "Login page not loading",
        description: "Users report blank screen on login",
        priority: "critical",
        status: "open",
        createdAt: ticketDate(6) 
    },

    {
        id: 7,
        title: "Dark mode toggle broken",
        description: "Dark mode doesn't persist after refresh",
        priority: "medium",
        status: "resolved",
        createdAt: ticketDate(10) 
    }
];

export const ticketAge = (id: number): number => {

    const ticket = tickets.find(ticket => ticket.id === id);
    if (!ticket) {
        throw new Error(`Ticket with id ${id} not found`);
    }

    const age = new Date().getTime() - new Date(ticket.createdAt).getTime();
    const ticketAge = Math.floor(age / (1000 * 60 * 60 * 24))

    return ticketAge
}

export const urgencyScore = (id: number): number => {
    const ticket = tickets.find(ticket => ticket.id === id)
    
    if (!ticket) {
        throw new Error(`Ticket with id ${id} not found`);
    }

    const BaseScore: number = 
    ticket.priority === "critical"
    ? 50
    : ticket.priority === "high"
    ? 30
    : ticket.priority === "medium"
    ? 20
    : 10

    const urgencyScore: number = BaseScore + (ticketAge(ticket.id) * 5)

    if (ticket.status === "resolved"){
        return 0
    }


    return urgencyScore
}

export const urgencyLevel = (id: number): string => {
    const score = urgencyScore(id);
    const urgencyLevel: string =
    score >= 80
    ? "Critical. Immediate attention required."
    :score >=55
    ? "High urgency. Prioritize resolution."
    :score >= 30
    ? "Moderate. Schedule for attention."
    :score >= 25
    ? "Low urgency. Address when capacity allows."
    : "Minimal. Ticket resolved."

    return urgencyLevel
}