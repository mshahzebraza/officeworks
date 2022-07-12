import { invalidResponse } from "../../../helpers/reusable";
import transactionModel from "../models/transactionModel";

// update a transaction
export const updateTransaction = async (req, res) => {
    const { transactionUUID, transactionData } = req.body;
    let transaction = await transactionModel.findById(transactionUUID);
    await transaction.overwrite(transactionData);
    const updatedTransaction = await transaction.save();
    res.status(200).json({
        success: true,
        data: updatedTransaction
    });
};
