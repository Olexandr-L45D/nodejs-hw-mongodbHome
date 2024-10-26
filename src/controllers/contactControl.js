// contactControl
import { getAllContacts, getContactsById } from './services/contacts.js';
// створюю функції контролери які тількти оброблюють
//new fuction contactAllControl
//new fuction contactByIdControl
export const contactAllControl = async (reg, res) => {
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
    // А тепер додаємо базову обробку помилки замість res.status(404)
    if (!contact) {
        next(new Error('Contact not found'));
        return;
    }
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
