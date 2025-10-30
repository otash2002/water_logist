import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

customerSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

customerSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("Customer", customerSchema);
