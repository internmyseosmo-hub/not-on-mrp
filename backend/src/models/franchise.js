import mongoose from "mongoose";

const franchiseEnquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    investmentBudget: {
      type: String,
      required: true,
      trim: true,
    },
    franchiseModel: {
      type: String,
      required: true,
      trim: true,
    },
    ownsRetailSpace: {
      type: String,
      required: true,
      trim: true,
    },
    additionalInformation: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const FranchiseEnquiry = mongoose.model("FranchiseEnquiry", franchiseEnquirySchema);

export default FranchiseEnquiry;
