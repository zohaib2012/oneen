import cloudinary from "../middleware/cloudinary.js";
import { Certificate } from "../model/certificate.model.js";
// Function to create a new certificate
export const createCertificate = async (req, res) => {
  try {
    // Destructure all fields from the request body
    const {
      certificateNumber,
      issueDate,
      expiryDate,
      customerImage,
      customerName,
      idNumber,
      gender,
      nationality,
      profession,
      educationalProgram,
      programCompletionDate,
      establishmentName,
      establishmentLicense
    } = req.body;

    // Log the values for debugging
    console.log({
      certificateNumber,
      issueDate,
      expiryDate,
      customerImage,
      customerName,
      idNumber,
      gender,
      nationality,
      profession,
      educationalProgram,
      programCompletionDate,
      establishmentName,
      establishmentLicense
    });

    // Validate that all required fields are provided
    if (!certificateNumber || !issueDate || !expiryDate || !customerName ||
        !idNumber || !gender || !nationality || !profession || !educationalProgram ||
        !programCompletionDate || !establishmentName || !establishmentLicense) {
      return res.status(400).json({ message: 'All fields are required.' });
    }


    const imageUrls = [];
        if (req.files?.length) {
            for (const file of req.files) {
                const result = await cloudinary.uploader.upload(
                    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
                    { folder: "products" }
                );
                imageUrls.push(result.secure_url);
            }
        }


    // Create a new certificate using the destructured values
    const newCertificate = await Certificate.create({
      certificateNumber,
      issueDate,
      expiryDate,
      customerImage:imageUrls,
      customerName,
      idNumber,
      gender,
      nationality,
      profession,
      educationalProgram,
      programCompletionDate,
      establishmentName,
      establishmentLicense
    });

    // Check if the certificate was successfully created
    if (!newCertificate) {
      return res.status(400).json({
        message: 'Error while creating the certificate. Please try again.'
      });
    }

    return res.status(201).json({
      message: 'Certificate created successfully.',
      certificate: newCertificate
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// export let sendproject = async (req, res) => {
//     try {

//         let detail = req.body
//         let { category, title } = detail
    


//         let projects = await projectshm.create({
//             category, title, project: imageUrls
//         })



//         return res.status(200).json({ message: "message added sucessfully", projects })
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// }


// Get all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single certificate by ID
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a certificate by ID
export const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json(certificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate by ID
export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
