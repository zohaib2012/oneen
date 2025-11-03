

import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const databaseconnection = () => {
    const dbURI = process.env.DATABASE; // Get MongoDB URI from .env file

    // If the DATABASE URI is missing, log an error and stop the application
    if (!dbURI) {
        console.error('MongoDB URI is missing in environment variables!');
        process.exit(1);
    }

    // Connect to MongoDB using the provided URI
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Error while connecting to the database:', error);
            process.exit(1); // Exit the process if the connection fails
        });

    // Correct event listeners for mongoose connection
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to the database');
    });

    mongoose.connection.on('error', (error) => {
        console.error('Mongoose connection error:', error);
    });
};
