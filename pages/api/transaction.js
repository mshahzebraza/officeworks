// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  updateTransaction
}
  from '../../server/controllers/transactionController';

import connectDB, { ncHandler } from '../../server/config/config'

const connectionDB = connectDB();

ncHandler.get(getAllTransactions);
ncHandler.post(createTransaction);
ncHandler.delete(deleteTransaction);
ncHandler.patch(updateTransaction)

export default ncHandler;
