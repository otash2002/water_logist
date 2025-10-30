import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving if it's new or modified
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Instance method to compare a plain text password with the hashed one
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
