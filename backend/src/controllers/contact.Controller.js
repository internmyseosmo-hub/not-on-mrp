import Contact from "../models/contact.js";

// @desc    Submit a new contact enquiry
// @route   POST /api/contact
export const submitContactForm = async (req, res, next) => {
    try {
        const { name, email, phone, enquiry, message } = req.body;

        if (!name || !email || !phone || !enquiry || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const newContact = await Contact.create({
            name,
            email: email.toLowerCase().trim(),
            phone,
            enquiry,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Your enquiry has been submitted successfully",
            data: newContact,
        });
    } catch (error) {
        // Handle duplicate email error (since email is unique in your schema)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A contact enquiry with this email has already been submitted.",
            });
        }
        next(error);
    }
};

// @desc    Get all contact enquiries
// @route   GET /api/contact
export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ timestamp: -1 });
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete contact enquiry
// @route   DELETE /api/contact/:id
export const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact enquiry not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
