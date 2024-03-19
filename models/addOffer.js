import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema(
  {
    offer: {
      type: String,
      required: [true, "Offer name is required"],
    },

    firm: {
      type: String,
      required: [true, "Firm name is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    worth: {
      type: String,
      required: [true, "Worth is required"],
    },
  },
  { timestamps: true }
);

const AddOffer = mongoose.models.AddOffer || mongoose.model("AddOffer", offerSchema);

export default AddOffer;
