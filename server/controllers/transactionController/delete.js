import { invalidResponse } from "../../../helpers/reusable";
import transactionModel from "../models/transactionModel";


// delete transaction
export const deleteTransaction = async (req, res) => {
    console.log('deleteTransaction!!!');
    const { transactionUUID } = req.query;
    if (!transactionUUID) invalidResponse(res, 'Please provide a valid transactionUUID')

    const deletedTransaction = await transactionModel.findByIdAndDelete(transactionUUID, { new: true });
    console.log("deletedTransaction product", deletedTransaction.product);

    // if deletion fails, return error
    if (!deletedTransaction) invalidResponse(res, 'Unsuccessful to delete Transaction!')

    // return success message
    res.status(200).json({
        success: true,
        message: "Transaction deleted successfully!",
        data: {
            deletedTransaction
        },
        error: null
    });
};
