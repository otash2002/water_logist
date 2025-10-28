import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['staff', 'manager', 'admin'], default: 'staff' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

staffSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

staffSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('Staff', staffSchema);
