import express from 'express';

const app = express();

app.use(express.json());

// Routes
app.get('/health-check', (req, res) => {
	res.send('server up');
});

export default app;
