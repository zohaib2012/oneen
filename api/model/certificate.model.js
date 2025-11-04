import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateNumber: { type: String, required: true },
  issueDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
  customerImage: [String],
  customerName: { type: String, required: true },
  idNumber: { type: String, required: true },
  gender: { type: String, required: true },
  nationality: { type: String, required: true },
  profession: { type: String, required: true },
  educationalProgram: { type: String, required: true },
  programCompletionDate: { type: String, required: true },
  establishmentName: { type: String, required: true },
  establishmentLicense: { type: String, required: true },
}, { timestamps: true });

export const Certificate = mongoose.model("Certificate", certificateSchema);
