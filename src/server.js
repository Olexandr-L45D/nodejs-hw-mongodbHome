// logic in setupServer
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRout from './routers/contactsRout.js';
// import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            }
        })
    );
    app.get('/', async (req, res) => {
        res.status(200).json({
            message: "Hello User!",

        });
    });
    app.use(contactsRout); // Додаємо роутер до app як middleware
    // прибираю ці два запити на коллекцію і переношу в файл РОУТЕР щоб зробити маршрутизацію
    // app.get('/contacts', async (req, res) => {
    //     const contacts = await getAllContacts();
    //     res.status(200).json({
    //         status: 200,
    //         message: "Successfully found contacts!",
    //         data: contacts,
    //     });
    // });
    // прибираю ці два запити на коллекцію і переношу в файл РОУТЕР щоб зробити маршрутизацію
    // app.get('/contacts/:contactId', async (req, res, next) => {
    //     const { contactId } = req.params;
    //     const contact = await getContactsById(contactId);
    //     if (!contact) {
    //         res.status(404).json({
    //             message: 'Contact not found'
    //         });
    //         return;
    //     }
    //     res.status(200).json({
    //         status: 200,
    //         message: `Successfully found contact with id ${contactId}!`,
    //         data: contact,
    //     });
    //     next();
    // });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// http://localhost:3000/contacts - in Postmen - ми отримаємо масив усіх contacts
// http://localhost:3000/contacts/:contactId - one contacts
