import cors from 'cors';
import express from 'express';
import routes from './controller/router';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
// Routes
app.use('/api', routes);

app.get('/health-check', (req, res) => {
	res.send('server up');
});

export default app;
