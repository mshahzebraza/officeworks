// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    createTransaction,
    deleteTransaction,
    fetchTransactions,
    updateTransaction
} from '../../server/controllers/transactionController/index';

import connectDB from '../../server/config/config'
import nextConnect from 'next-connect';
import { invalidResponse } from '../../helpers/reusable';



// Define Middlewares for "Error" & "No Match"
const handlerConfig = {
    onNoMatch: (req, res) => {
        invalidResponse(res, `Method ${req.method} not allowed`, 405)
    },
    onError: (err, req, res) => {
        invalidResponse(res, err.message, 500)
    }
}


connectDB();
const ncHandler = nextConnect(handlerConfig);

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