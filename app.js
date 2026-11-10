// app.js
import express from 'express'
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Middleware
app.use(express.json());
// Routes
app.use(router);

// Root route for health check
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
});

export default app;