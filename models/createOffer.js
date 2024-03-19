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

    discription: {
      type: String,
      required: [true, "Discription is required"],
    },

    worth: {
      type: String,
      required: [true, "Worth is required"],
    },

    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CreateOffer =
  mongoose.models.CreateOffer || mongoose.model("CreateOffer", offerSchema);

export default CreateOffer;
