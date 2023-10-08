import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
    default: 0,
  },
  payDayTransactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transaction',
    },
  ],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
  ],
  bills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bill',
    },
  ],
  // this is where the balance in PayDay  goes to by default
  balanceAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
  // this is the linked account in 'Bills & Utilities'
  billsAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
});

export default mongoose.model('User', UserSchema);
