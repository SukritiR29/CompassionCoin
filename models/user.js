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
<<<<<<< HEAD
    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
      },
},
{ timestamps: true}
=======

    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
  },
  { timestamps: true }
>>>>>>> 2db4622c6b3ff770f8ab60bbadd494adcc892b58
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
