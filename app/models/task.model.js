import { Schema, model } from 'mongoose';

const TaskSchema = Schema({
  description: String,
  state: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

export default model('Task', TaskSchema);
