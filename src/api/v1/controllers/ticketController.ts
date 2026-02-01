import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Ticket } from "../models/ticketModel";
import * as ticketService from "../services/ticketServices";
// import { tickets } from "src/data/ticketData";

export const getAllTickets = async(req: Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        const tickets: Ticket[] = await ticketService.getAllTickets();

        res.status(HTTP_STATUS.OK).json({
            message: "Tickets retrieved.",
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        next(error);
    }
}

export const getTicketUrgency = async(req: Request, res: Response): Promise<void> => {
    try{
        const id = req.params.id;

        const ticket = await ticketService.getTicketUrgency(Number(id));

        res.status(HTTP_STATUS.OK).json({
            message: "Ticket urgency calculated.",
            data: ticket,
        });
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found"
        });
    }
}

export const createTicket = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            priority
        }: {
            title: string | undefined;
            description: string | undefined;
            priority: string | undefined;
        } = req.body;
        
        // Validate required fields
        if (!title) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: title",
            });
        } else if (!description){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: description",
            });
            
        } else if (!priority){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: priority",
            });
            
        } else if (priority !== "critical" && priority !== "high" && priority !== "medium" && priority !== "low"){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid priority. Must be one of: critical, high, medium, low",
            });
            
        } else {
            // Explicitly extract only the fields our service needs
            // This is necessary because Pick/Omit only work at compile time
            const ticketData: { title: string; description: string; priority: string} = {
                title,
                description,
                priority
            };

            const newTicket = await ticketService.createTicket(ticketData);

            res.status(HTTP_STATUS.CREATED).json({
                message: "Ticket created successfully",
                data: newTicket,
            });
        }
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create ticket",
        });
    }
};

export const updateTicket = async(req: Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        const id = req.params.id;

        const {priority, status} = req.body;
        
        if (priority !== "critical" && priority !== "high" && priority !== "medium" && priority !== "low"){
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid priority. Must be one of: critical, high, medium, low",
            });
        } else if (status !== "open" && status !== "in-progress" && status !== "resolved") {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Invalid status. Must be one of: open, in-progress, resolved",
            });
        } else {
            const updateData = {priority, status};
    
            const updateTicket = await ticketService.updateTicket(Number(id), updateData)
    
            res.status(HTTP_STATUS.OK).json({
                message: "Ticket updated successfully",
                data: updateTicket,
            });
        }
    } catch(error) {
        next(error);
    }
};

export const deleteTicket = async(req: Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        const id = req.params.id;
        
        await ticketService.deleteTicket(Number(id))
        
        res.status(HTTP_STATUS.OK).json({
            message: "Ticket deleted successfully",
        });
    } catch(error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found.",
        });
    }
};