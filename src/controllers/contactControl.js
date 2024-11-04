// contactControl
// Тіло запиту можна отримати у контролері
// з об'єкта запиту req як властивість body.
import {
    getAllContacts, getContactsById,
    createNewContact, deletContactById, updateContactById
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// створюю функції контролери які тількти оброблюють
//new fuction contactAllControl
//new fuction contactByIdControl
// new fuction createContactController (додавання новго контакта)
export const createContactController = async (req, res) => {
    // Тіло функції
    const contact = await createNewContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Successfully add new contact!',
        data: contact
    });
};
export const contactAllControl = async (req, res) => {
    // стандартний запис контролера:
    // const controller = (req, res) => {
    //     const body = req.body;
    // }
    // const body = req.body;
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortOredr, sortBy } = parseSortParams(req.query);
    const contacts = await getAllContacts({
        page, perPage,
        sortOredr, sortBy,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts',
        data: contacts
    });
};
// router.get('/contacts', async (req, res) => {
//     const contacts = await getAllContacts();
//     res.status(200).json({
//         status: 200,
//         message: 'Htis is all contacts',
//         data: contacts
//     });
// });
export const deleteContactControl = async (req, res, next) => {
    const { contactId } = req.params;
    const deletcontact = await deletContactById(contactId);
    if (!deletcontact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    // if (!contact) {
    //     next(new Error('Contact not found'));
    //     return;
    // }
    res.status(204).send(
        // {
        //     status: 204,
        //     message: `Successfully delet contact with id ${contactId}!`,
        //     data: deletcontact,
        // }
    );
    // res.status(204).json({
    //     status: 204,
    //     message: `Successfully delet contact with id ${contactId}!`,
    //     data: deletcontact,
    // });
};


export const contactByIdControl = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    // if (!contact) {
    //     res.status(404).json({
    //         status: 404,
    //         massage: 'Contact not found',
    //     });
    //     return;
    // }
    // А тепер додаємо базову обробку помилки замість res.status(404)=> add class Error
    // далі на методі класа Error використорвую метод createHttpError
    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }
    // if (!contact) {
    //     next(new Error('Contact not found'));
    //     return;
    // }
    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};
// Після цього використаємо контролери у файлі роутів.
// router.get('/contacts/:contactId', async (req, res, next) => {
//     const { contactId } = req.params;
//     const contact = await getContactsById(contactId);
//     // Відповідь, якщо контакт не знайден
//     if (!contact) {
//         res.status(404).json({
//             status: 404,
//             massage: 'Contact not found',
//         });
//         return;
//     }
//     res.status(200).json({
//         status: 200,
//         message: `Successfully found contact with id ${contactId}!`,
//         data: contact,
//     });
// });
// upsertContactControl
// щоб функція updateContactById могла не тільки оновлювати, але й створювати ресурс при його відсутності, необхідно їй аргументом додатково передати { upsert: true }.
export const upsertContactControl = async (req, res, next) => {
    const { contactId } = req.params;
    const resultUpdate = await updateContactById(contactId, req.body, {
        upsert: true,
    });
    if (!resultUpdate) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    const status = resultUpdate.isNew ? 201 : 200;
    res.status(status).json({
        status: 200,
        massage: 'Successfully upserted a contact!',
        data: resultUpdate.contact,
    });
};
// Оскільки ми вже маємо функцію сервісу updateStudent, яку ми до цього створили для PUT ендпоінта, то можемо не створювати нову, а перевикористати її.Єдина відмінність буде полягати в тому, що ми не будемо під час виклику нічого передавати третім аргументом options
export const patchContactControl = async (req, res, next) => {
    const { contactId } = req.params;
    const resultPatch = await updateContactById(contactId, req.body);
    if (!resultPatch) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        massage: 'Successfully patched a contact!',
        data: resultPatch.contact,
    });
};
