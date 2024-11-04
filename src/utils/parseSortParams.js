// parseSortParams.js  - квері параметри для сортування (за звичай по найм або сонейм)

import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
    const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if (isKnownOrder) return sortOrder;
    return SORT_ORDER.ASC;
};
const parseSortBy = (sortBy) => {
    const keysOfContact = [
        '_id',
        'name', 'phoneNumber', 'email',
        'contactType', 'createdAt',
        'updatedAt',
    ];
    if (keysOfContact.includes(sortBy)) {
        return sortBy;
    }
    return '_id';
};
export const parseSortParams = (query) => {
    const { sortOrder, sortBy } = query;
    const parsedisSortOrder = parseSortOrder(sortOrder);
    const parsedisSortBy = parseSortBy(sortBy);
    return {
        sortOrder: parsedisSortOrder,
        sortBy: parsedisSortBy,
    };
};
