import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
	cloud_name: "dlrinxri6",
	api_key: "238474534336935",
	api_secret: "Ny2YF34-KOL1KrPBKxBAvR4hs7U",
});

export default cloudinary