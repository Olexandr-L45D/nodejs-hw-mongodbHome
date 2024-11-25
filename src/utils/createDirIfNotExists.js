import fs from 'node:fs/promises';
// createDirIfNotExists, яка буде перевіряти, чи існує директорія за вказаним шляхом (url). Якщо директорія не існує, то функція створить її
export const createDirIfNotExists = async (url) => {
    try {
        await fs.access(url);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(url);
        }
    }
};
