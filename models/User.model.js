const { Schema, model } = require("mongoose");


const userSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: [true, 'Password is required.'] },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    myTrips: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;