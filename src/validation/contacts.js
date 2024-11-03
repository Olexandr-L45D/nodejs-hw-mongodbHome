import Joi from 'joi';

export const createContactChema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Username should be a string', // Кастомізація повідомлення для типу "string"
        'string.min': 'Username should have at least {#limit} characters',
    }),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(6).max(16).required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    avgMark: Joi.number().min(2).max(12).required(),
    onDuty: Joi.boolean(),
});
// методи валідації, такі як validate або validateAsync, для перевірки об'єктів даних на відповідність цій схемі.
const productUserToValidate = {
    name: 'Jonni',
    email: 'jonni.doe@example.gmail.com',
    age: 15,
    gender: 'male',
    avgMark: 10.2,
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

