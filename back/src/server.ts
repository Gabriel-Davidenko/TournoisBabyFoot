import { app } from './app';
import config from './config/config';
import { appDataSource } from './datasource';

(async () => {
	try {
		console.log('Initializing DataSource...');
		await appDataSource.initialize();
		console.log('DataSource initialized ✅');

		app.listen(config.port, () => {
			console.log(`Server running at http://localhost:${config.port}`);
		});
	} catch (err) {
		console.error('Failed to initialize DataSource ❌', err);
	}
})();
