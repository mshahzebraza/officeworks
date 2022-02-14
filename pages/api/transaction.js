// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction
}
  from '../../server/controllers/transactionController';

import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandlerNew = nextConnect();

ncHandlerNew.get(getAllTransactions);
ncHandlerNew.post(createTransaction);
ncHandlerNew.delete(deleteTransaction);
ncHandlerNew.patch(updateTransaction)

export default ncHandlerNew;
