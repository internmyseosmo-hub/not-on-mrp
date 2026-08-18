import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required"],
            trim: true,
        },
        enquiry: {
            type: String,
            required: [true, "Enquiry is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },

    }
);
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;