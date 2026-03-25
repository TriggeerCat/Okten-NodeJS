import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { STATUS_CODE } from "../enums/status-code.enum";
import { ApiError } from "../errors/api.error";
import { tokenService } from "../services/token.service";

class CommonMiddleware {
    public validateId(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (!isObjectIdOrHexString(id)) {
            next(new ApiError("Invalid id", STATUS_CODE.BAD_REQUEST));
            return;
        }
        next();
    }

    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                // @ts-expect-error e is definitely Joy.ValidationError, but checks for it don't work properly
                next(new ApiError(e.details[0].message, STATUS_CODE.BAD_REQUEST));
            }
        };
    }

    public validateRoleFromToken(role: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            const tokenPayload = tokenService.verifyToken(req.headers.authorization?.split(" ")[1] ?? " ", "access");
            if (tokenPayload.role !== role) {
                next(new ApiError("Wrong role provided!", STATUS_CODE.BAD_REQUEST));
                return;
            }
            next();
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
