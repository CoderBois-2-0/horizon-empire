import { drizzle } from 'drizzle-orm/neon-http';

function connectDB(dbUrl: string) {
	return drizzle(dbUrl);
}

export {
	connectDB
}
