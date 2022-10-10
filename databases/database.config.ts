import * as dotenv from 'dotenv';

dotenv.config();

export interface IDatabaseConfigAttributes {
	dialect?: string;
	host?: string;
	port?: number;
	username?: string;
	password?: string;
	database?: string;
}

export interface IDatabaseConfig {
	nimbus_rate: IDatabaseConfigAttributes;
	nimbus_events: IDatabaseConfigAttributes;
}

export const dbConfig: IDatabaseConfig = {
	nimbus_rate: {
		username: process.env.DB_NIMBUS_USER,
		password: process.env.DB_NIMBUS_PASSWORD,
		database: process.env.DB_NIMBUS_NAME,
		host: process.env.DB_NIMBUS_HOST,
		port: Number(process.env.DB_NIMBUS_PORT) ?? 5432,
		dialect: 'postgres'
	},
	
	nimbus_events: {
		username: process.env.DB_EVENTS_USER,
		password: process.env.DB_EVENTS_PASSWORD,
		database: process.env.DB_EVENTS_NAME,
		host: process.env.DB_EVENTS_HOST,
		port: Number(process.env.DB_EVENTS_PORT) ?? 5432,
		dialect: 'postgres'
	}
	
	
};
