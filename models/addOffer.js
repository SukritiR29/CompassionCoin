
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


    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);
offerSchema.index({ userId: 1 });
const AddOffer = mongoose.models.AddOffer || mongoose.model("AddOffer", offerSchema);

export default AddOffer;