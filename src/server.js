import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
 

function setupServer() {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors);
    app.use(pino());

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

export { setupServer };