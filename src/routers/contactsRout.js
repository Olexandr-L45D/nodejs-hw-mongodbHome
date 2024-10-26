import { Router } from 'express';
// import { getAllContacts, getContactsById } from './services/contacts.js';
const router = Router();
import { contactAllControl, contactByIdControl } from '../controllers/contactControl.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// Імпортуємо Router з Express, щоб створити об'єкт роутера router, після чого одразу експортуємо його.
// router.get('/contacts', contactAllControl);
router.get('/contacts', ctrlWrapper(contactAllControl));
// router.get('/contacts', async (req, res) => {
//     const contacts = await getAllContacts();
//     res.status(200).json({
//         status: 200,
//         message: 'Htis is all contacts',
//         data: contacts
//     });
// });
// router.get('/contacts/:contactId', contactByIdControl);
router.get('/contacts/:contactId', ctrlWrapper(contactByIdControl));
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

export default router;
