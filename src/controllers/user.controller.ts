import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body as IUserUpdateDTO;
            const data = await userService.updateById(id, user);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload;
            if (id === userId) {
                new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.blockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
    public async unblockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload;
            if (id === userId) {
                new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const data = await userService.unblockUser(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
