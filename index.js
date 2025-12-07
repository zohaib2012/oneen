import express from 'express'
import { databaseconnection } from './database/database.js';
import { userroutes } from './api/routes/user.routes.js';
import { certificateroutes } from './api/routes/certificate.routes.js';
import cors from "cors";
const app = express(); 
app.use(express.json());
 databaseconnection()
app.use(cors({
  origin: ["http://localhost:5173", 'https://www.alriyadh-gov-sa.online','https://alriyadh-gov-sa.online','https://certiicationssfrontend-k32l.vercel.app', 'https://certiicationssfrontend-ffrz9k5nx-zohaibs-projects-8573595d.vercel.app', "https://certiicationssfrontend.vercel.app",'https://eservices.alriyadh-gov-sa.online','https://www.eservices.alriyadh-gov-sa.online'],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials:true
}));
app.use('/api/user',userroutes)
app.use('/api/certificate',certificateroutes)
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
