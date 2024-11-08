import { Router } from 'express';
// import { getAllContacts, getContactsById } from './services/contacts.js';
const router = Router();
import {
    contactAllControl, contactByIdControl, createContactController,
    deleteContactControl, upsertContactControl, patchContactControl
} from '../controllers/contactControl.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactChema, updateContactChema } from '../validation/contacts.js';
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
router.get('/contacts/:contactId', isValidId, ctrlWrapper(contactByIdControl));
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
// router.post('/contacts', ctrlWrapper(createContactController));
router.post('/contacts', validateBody(createContactChema), ctrlWrapper(createContactController));
// router.post('/register', validateBody(createContactChema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactControl));
router.put('/contacts/:contactId', validateBody(createContactChema), ctrlWrapper(upsertContactControl));
router.patch('/contacts/:contactId', validateBody(updateContactChema), ctrlWrapper(patchContactControl));

export default router;
