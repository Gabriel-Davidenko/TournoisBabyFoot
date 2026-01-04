import dotenv from 'dotenv';

dotenv.config();

interface Config {
	port: number;
	nodeEnv: string;
	POSTGRES_DB: string;
	POSTGRES_USER: string;
	POSTGRES_PASSWORD: string;
}

const config: Config = {
	port: Number(process.env.PORT) || 3000,
	nodeEnv: process.env.NODE_ENV || 'development',
	POSTGRES_DB: process.env.POSTGRES_DB ?? 'babyfoot',
	POSTGRES_USER: process.env.POSTGRES_USER ?? 'postgres',
	POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? 'password',
};

export default config;
