import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repositories/pizza.repository";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await pizzaRepository.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = req.body as IPizzaCreateDTO;
            const data = await pizzaRepository.create(pizza);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const pizzaController = new PizzaController();
