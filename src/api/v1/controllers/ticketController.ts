import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { Ticket } from "../models/ticketModel";
import * as tickerService from "../services/ticketServices";
// import { tickets } from "src/data/ticketData";

export const getAllTickets = async(req: Request, res: Response, next:NextFunction): Promise<void> => {
    try{
        const tickets: Ticket[] = await tickerService.getAllTickets();

        res.status(HTTP_STATUS.OK).json({
            message: "Tickets retrieved",
            count: tickets.length,
            data: tickets,
        });
    } catch (error) {
        next(error);
    }
}
