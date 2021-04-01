const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  description: String,
  state: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Task', TaskSchema);
