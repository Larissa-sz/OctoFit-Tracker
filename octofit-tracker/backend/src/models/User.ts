import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default model('User', userSchema);