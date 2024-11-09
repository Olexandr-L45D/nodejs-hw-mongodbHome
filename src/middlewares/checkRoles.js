import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/ContactsCollection.js';
import { ROLES } from '../constants/index.js';

export const checkRoles =
    (...roles) =>
        async (req, res, next) => {
            const { user } = req;
            if (!user) {
                next(createHttpError(401));
                return;
            }

            const { role } = user;
            if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
                next();
                return;
            }
            if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
                const { contactId } = req.params;
                if (!contactId) {
                    next(createHttpError(403));
                }

                const contact = await ContactsCollection.findOne({
                    _id: contactId,
                    parentId: user._id,
                });
                if (contact) {
                    next();
                    return;
                }
            }
            next(createHttpError(403));
        };
