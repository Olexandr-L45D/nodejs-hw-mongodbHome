// валідація ідентифікаторів on isValidObjectId in mongoose, атак, щоб уникнути шкідливих та некоректних запитів
import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        throw createHttpError(400, 'Bad Request');

    }
    next();
};
