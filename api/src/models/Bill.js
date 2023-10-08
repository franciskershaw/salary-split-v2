import mongoose from 'mongoose';

const BillSchema = mongoose.Schema({
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
  paidEvery: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  startDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Bill', BillSchema);
