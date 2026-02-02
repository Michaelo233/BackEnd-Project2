// import { Request, Response, NextFunction } from "express";
// import * as ticketController from "../src/api/v1/controllers/ticketController";
import { Ticket } from "src/api/v1/models/ticketModel";
import * as ticketService from "../src/api/v1/services/ticketServices";
import { ticketDate } from "../src/data/ticketData";
// import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/services/ticketServices");

describe("Ticket Controller", () => {
    

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test GetAllProducts Controller
    describe("getTicket services", () => {
        it("should handle successful operation", async () => {
            const mockItems = [
                { 
                    id: 1,
                    title: "Update footer copyright year",
                    description: "Footer still shows 2024",
                    priority: "low",
                    status: "open",
                    createdAt: ticketDate(3)
    },
            ];

            (ticketService.getAllTickets as jest.Mock).mockResolvedValue(mockItems);
            const result = await ticketService.getAllTickets();
            expect(ticketService.getAllTickets).toHaveBeenCalled();
            expect(result).toEqual(mockItems)
        });
    });

    describe("getTicketUrgency services", () => {
        it("should handle successful urgency operation", async () => {
            const mockItems: Ticket =
                { 
                    id: 1,
                    title: "Update footer copyright year",
                    description: "Footer still shows 2024",
                    priority: "low",
                    status: "open",
                    createdAt: ticketDate(3)
                };

            const calUrgency: Ticket = {
                id: mockItems.id,
                title: mockItems.title,
                description: mockItems.description,
                priority: mockItems.priority,
                status: mockItems.status,
                createdAt: mockItems.createdAt,
                ticketAge: 3,
                urgencyScore: 25,
                urgencyLevel: "Low urgency. Address when capacity allows.",
            };

            (ticketService.getTicketUrgency as jest.Mock).mockResolvedValue(calUrgency);
            const result = await ticketService.getTicketUrgency(mockItems.id);
            expect(ticketService.getTicketUrgency).toHaveBeenCalledWith(mockItems.id);
            expect(result).toEqual(calUrgency)
        });
    });

    describe("getTicketUrgency services", () => {
        it("should handle successful urgency operation", async () => {
            const mockItems: Ticket =
                { 
                    id: 2,
                    title: "Update footer copyright year",
                    description: "Footer still shows 2024",
                    priority: "high",
                    status: "open",
                    createdAt: ticketDate(7)
                };

            const calUrgency: Ticket = {
                id: mockItems.id,
                title: mockItems.title,
                description: mockItems.description,
                priority: mockItems.priority,
                status: mockItems.status,
                createdAt: mockItems.createdAt,
                ticketAge: 7,
                urgencyScore: 65,
                urgencyLevel: "High urgency. Prioritize resolution.",
            };

            (ticketService.getTicketUrgency as jest.Mock).mockResolvedValue(calUrgency);
            const result = await ticketService.getTicketUrgency(mockItems.id);
            expect(ticketService.getTicketUrgency).toHaveBeenCalledWith(mockItems.id);
            expect(result).toEqual(calUrgency)
        });
    });

    describe("getTicketUrgency services", () => {
        it("should handle successful urgency operation", async () => {
            const mockItems: Ticket =
                { 
                    id: 2,
                    title: "Update footer copyright year",
                    description: "Footer still shows 2024",
                    priority: "critical",
                    status: "open",
                    createdAt: ticketDate(7)
                };

            const calUrgency: Ticket = {
                id: mockItems.id,
                title: mockItems.title,
                description: mockItems.description,
                priority: mockItems.priority,
                status: mockItems.status,
                createdAt: mockItems.createdAt,
                ticketAge: 7,
                urgencyScore: 85,
                urgencyLevel: "Critical. Immediate attention required.",
            };

            (ticketService.getTicketUrgency as jest.Mock).mockResolvedValue(calUrgency);
            const result = await ticketService.getTicketUrgency(mockItems.id);
            expect(ticketService.getTicketUrgency).toHaveBeenCalledWith(mockItems.id);
            expect(result).toEqual(calUrgency)
        });
    });

    describe("getTicketUrgency services", () => {
        it("should handle successful urgency operation", async () => {
            const mockItems: Ticket =
                { 
                    id: 2,
                    title: "Update footer copyright year",
                    description: "Footer still shows 2024",
                    priority: "critical",
                    status: "resolved",
                    createdAt: ticketDate(7)
                };

            const calUrgency: Ticket = {
                id: mockItems.id,
                title: mockItems.title,
                description: mockItems.description,
                priority: mockItems.priority,
                status: mockItems.status,
                createdAt: mockItems.createdAt,
                ticketAge: 7,
                urgencyScore: 85,
                urgencyLevel: "Minimal. Ticket resolved.",
            };

            (ticketService.getTicketUrgency as jest.Mock).mockResolvedValue(calUrgency);
            const result = await ticketService.getTicketUrgency(mockItems.id);
            expect(ticketService.getTicketUrgency).toHaveBeenCalledWith(mockItems.id);
            expect(result).toEqual(calUrgency)
        });
    });

    describe("getTicketUrgency services", () => {
        it("should handle error", async () => {
            const mockError = new Error("Test Error");


            (ticketService.getTicketUrgency as jest.Mock).mockRejectedValue(mockError);
            await expect(ticketService.getTicketUrgency(1)).rejects.toThrow("Test Error");
        });
    });
});