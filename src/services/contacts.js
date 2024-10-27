//
import { ContactsCollection } from '../db/ContactsCollection.js';

export const getAllContacts = async () => {
    const contacts = await ContactsCollection.find();
    return contacts;
};
// getAllContacts повертає - видає весь масив студентів згідно шаблону описаному в ContactsCollection за рах методу find()
export const getContactsById = async (contactId) => {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
};
// getContactsById знаходить обєкт одного студента по айді за рах мет findById
export const createNewContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};
// getContactsById знаходить обєкт одного студента
// Для створення нового документа в колекції, на основі вказаної моделі,
//  в Mongoose використовується метод:  Model.create(doc) = create(payload)
// doc — перший аргумент (обов’язковий), який містить дані (об'єкт або масив об'єктів)
