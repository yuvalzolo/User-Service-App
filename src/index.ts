import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import { UserResolver } from './resolvers/UserResolver';
import { User } from './entities/User';

dotenv.config();

// Create TypeORM DataSource
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'users_db',
    synchronize: true, // Auto-creates tables from entities — great for dev
    logging: false,
    entities: [User],
});

async function startServer() {
    try {
        await AppDataSource.initialize();
        console.log('✅ Connected to the database');

        const schema = await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        });

        const server = new ApolloServer({ schema });

        const { url } = await server.listen({ port: 4000 });
        console.log(`🚀 Server is running at ${url}`);
    } catch (err) {
        console.error('❌ Failed to start server:', err);
    }
}

startServer();
