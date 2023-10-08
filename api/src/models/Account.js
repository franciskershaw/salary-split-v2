import mongoose from 'mongoose';

const AccountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  availableInPayDay: {
    type: Boolean,
    required: true,
    default: true,
  },
  includeInTotal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model('Account', AccountSchema);
