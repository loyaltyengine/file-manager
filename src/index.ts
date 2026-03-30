import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import { DIContainer } from './config/container.js';
import fileRouter from './routes/file.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

try {
    // Initialize container
    await DIContainer.initialize();

    // Routes
    app.use('/v1/files', fileRouter)

    // Error Handler
    app.use(errorHandler);

    // Start Server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
} catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
}

export default app;
