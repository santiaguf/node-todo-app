import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: String,
}, {
  timestamps: true,
});

export default model('User', UserSchema);
