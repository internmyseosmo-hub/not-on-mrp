import FranchiseEnquiry from "../models/franchise.js";

export const createFranchiseEnquiry = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            city,
            state,
            investmentBudget,
            franchiseModel,
            ownsRetailSpace,
            additionalInformation
        } = req.body;

        const newEnquiry = new FranchiseEnquiry({
            fullName,
            email,
            phoneNumber,
            city,
            state,
            investmentBudget,
            franchiseModel,
            ownsRetailSpace,
            additionalInformation
        });

        const savedEnquiry = await newEnquiry.save();

        res.status(201).json({
            success: true,
            message: "Franchise enquiry submitted successfully",
            data: savedEnquiry
        });
    } catch (error) {
        console.error("Error creating franchise enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit franchise enquiry",
            error: error.message
        });
    }
};

export const getAllFranchiseEnquiries = async (req, res) => {
    try {
        const enquiries = await FranchiseEnquiry.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: enquiries
        });
    } catch (error) {
        console.error("Error fetching franchise enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch franchise enquiries",
            error: error.message
        });
    }
};

export const deleteFranchiseEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnquiry = await FranchiseEnquiry.findByIdAndDelete(id);
        
        if (!deletedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Franchise enquiry deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting franchise enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete franchise enquiry",
            error: error.message
        });
    }
};
