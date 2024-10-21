// logic
import express from 'express';
const app = express();
const PORT = 3000;

export const setupServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is running is listen on port ${PORT}`);

    });
};
