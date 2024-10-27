// contactControl
// Тіло запиту можна отримати у контролері
// з об'єкта запиту req як властивість body.
import { getAllContacts, getContactsById, createNewContact } from './services/contacts.js';
import createHttpError from 'http-errors';
// створюю функції контролери які тількти оброблюють
//new fuction contactAllControl
//new fuction contactByIdControl
// new fuction createContactController (додавання новго контакта)
export const createContactController = async (req, res) => {
    // Тіло функції
    const contact = await createNewContact(req.body);
    res.status(201).json({
        status: 201,
        message: 'Add new contact',
        data: contact
    });
};
export const contactAllControl = async (req, res) => {
    // стандартний запис контролера:
    // const controller = (req, res) => {
    //     const body = req.body;
    // }
    // const body = req.body;
    const contacts = await getAllContacts();
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
