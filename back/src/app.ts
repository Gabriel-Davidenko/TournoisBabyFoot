import express from 'express';
import { appDataSource } from './config/datasource';

try {
	(async () => {
		const result = await appDataSource.initialize();
	})();
	console.log('Data Source has been initialized!');
} catch (error) {
	console.error('Error during Data Source initialization:', error);
}
const app = express();

app.use(express.json());

// Routes
app.get('/health-check', (req, res) => {
	res.send('server up');
});

export default app;
