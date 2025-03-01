import {validationResult} from "express-validator";
import {Request, Response, NextFunction} from "express";
import {BlogDBType, PostDBType} from "../types/db.interface";

export type FieldNamesType = keyof BlogDBType | keyof PostDBType
export type OutputErrorsType = {
    errorsMessages: {
        message: string,
        field: FieldNamesType}[]
}


export const errorMiddleware = (req: Request, res: Response<OutputErrorsType>, next: NextFunction) => {
    const e = validationResult(req)
    if (!e.isEmpty()) {
        const eArray = e.array({onlyFirstError: true}) as { path: FieldNamesType, msg: string, location: string }[]
        res
            // .status(eArray && eArray[0].path === 'name' ? 400 : 404)
            .status(eArray && eArray.find(x => x.location === 'params') ? 404 : 400)
            .json({
                errorsMessages: eArray.map(x => ({field: x.path, message: x.msg}))
            })
        return
    }
    next()
}
