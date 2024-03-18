import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },

    appliedOffer: [
      {
        offerId: {
          type: Schema.Types.ObjectId,
          ref: "Offer",
        },
  
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },

    ] 
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
