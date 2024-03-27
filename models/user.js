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

    createdOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      }
    ],

    appliedOffer: [
      {
        offerId: {
          type: Schema.Types.ObjectId,
          ref: "Offer",
        },

        sender: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        exp: {
          type: String,
          required: true,
        },
        approach: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
  },
  
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
