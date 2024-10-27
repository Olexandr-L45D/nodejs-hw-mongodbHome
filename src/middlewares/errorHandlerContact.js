// errorHandlerContact
// Далі виконаємо рефакторинг errorHandler middleware, додавши в ній можливість працювати з помилками, створеними за допомогою http-errors :
import { HttpError } from 'http-errors';

export const errorHandlerContact = (err, req, res, next) => {
    // Перевірка, чи отримали ми помилку від createHttpError
    if (err instanceof HttpError) {
        res.status(err.status).json(
            {
                status: err.status,
                message: err.name,
                data: err,
            }
        );
        return;
    }

    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        error: err.message,
    });
};
