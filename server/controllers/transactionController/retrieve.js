import { invalidResponse } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import transactionModel from "../models/transactionModel";


// Fetch all transactions
export const fetchTransactions = CatchAsyncErrors(async (req, res) => {
    const transactionList = await transactionModel.find({});
    res.status(200).json({
        success: true,
        data: {
            transactionList
        }
    });
});
