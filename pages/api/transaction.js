// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    createTransaction,
    deleteTransaction,
    fetchTransactions,
    updateTransaction
} from '../../server/controllers/transactionController/index';

import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';

connectDB();
const ncHandler = nextConnect();

ncHandler.get(fetchTransactions);
ncHandler.delete(deleteTransaction);
ncHandler.post(createTransaction);
ncHandler.patch(updateTransaction)

export default ncHandler;


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '2mb' // Set desired value here
        }
    }
}