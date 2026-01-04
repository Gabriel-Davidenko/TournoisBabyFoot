import express from 'express';

const app = express();

app.use(express.json());

// Routes
app.use('/');

// Global error handler (should be after routes)
app.use();

export default app;