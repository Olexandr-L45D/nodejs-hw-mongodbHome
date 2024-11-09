import Joi from 'joi';

export const createContactChema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
    }),
    phoneNumber: Joi.string().min(7).max(30).required().messages({
        'string.base': 'phoneNumber should be a number', // Кастомізація повідомлення для типу "string"
        'string.min': 'phoneNumber should have at least {#limit} characters',
    }),
    email: Joi.string().email().required(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    parentId: Joi.string().required(),  // нова властивість

});
export const updateContactChema = Joi.object({
    name: Joi.string().min(3).max(30).messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
    }),
    phoneNumber: Joi.string().min(7).max(30).messages({
        'string.base': 'phoneNumber should be a number', // Кастомізація повідомлення для типу "string"
        'string.min': 'phoneNumber should have at least {#limit} characters',
    }),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),

});
// методи валідації, такі як validate або validateAsync, для перевірки об'єктів даних на відповідність цій схемі.
const productUserToValidate = {
    name: 'Jonni',
    phoneNumber: '125-25-35',
    email: 'jonni.doe@example.gmail.com',
    contactType: 'home',

};
// Важливо вказати { abortEarly: false } другим аргументом при виклику методу validate, щоб отримати всі можливі помилки валідації, а не першу з них:
const validationResult = createContactChema.validate(productUserToValidate, {
    abortEarly: false,
});
if (validationResult.error) {
    console.error(validationResult.error.message);
} else {
    console.log('Data is valid!');

}

