import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    offerName: {
      type: String,
      required: true,
    },

    offerDetails: {
      type: String,
      required: true,
    },

    offerPrize: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);
export default Offer;

