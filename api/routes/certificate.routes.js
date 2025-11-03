import express from "express";
import { createCertificate, deleteCertificate, getCertificateById, getCertificates, updateCertificate } from "../controlller/certificate.controller.js";
import { processFileUpload } from "../middleware/multer.js";

export let certificateroutes= express.Router()

certificateroutes.route('/create').post(processFileUpload,createCertificate)
certificateroutes.route('/get').get(getCertificates)
certificateroutes.route('/get/:id').get(getCertificateById)
certificateroutes.route('/update/:id').put(updateCertificate)
certificateroutes.route('/delete/:id').delete(deleteCertificate)