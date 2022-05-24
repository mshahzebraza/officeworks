import { invalidResponse } from "../../helpers/reusable";
import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import transactionModel from "../models/transactionModel";


// Fetch all transactions
export const getAllTransactions = CatchAsyncErrors(async (req, res) => {
     const transactionList = await transactionModel.find({});
     res.status(200).json({
          success: true,
          data: {
               transactionList
          }
     });
});

// delete transaction
export const deleteTransaction = CatchAsyncErrors(async (req, res) => {
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
});

// create a transaction
export const createTransaction = CatchAsyncErrors(async (req, res) => {
     const { transactionData, transactionDataList } = req.body;
     const isMultipleDataPassed = transactionDataList?.length > 0 && !transactionData; //! Always multiple!!!
     // ? Each data-set of transactionDataList must be converted to a single transaction. 
     // ? If transactionDataList is empty, then create a single transaction against the transactionData.
     let createdTxnList;

     createdTxnList = [];
     // let txnList = [];
     // add each of the incoming transactions to the database

     // *Working Alternative 01 (PC-01): replaced the above forEach loop with a forOf loop. This works on sequential execution.
     for (const transaction of transactionDataList) {
          const newTransaction = await transactionModel.create(transaction);
          // txnList.push(newTransaction);
          createdTxnList.push(newTransaction);
     }

     // createdTxnList = txnList;



     res.status(200).json({
          success: true,
          message: "Multiple Transaction(s) created successfully!",
          data: {
               createdTxnList
          },
          error: null,
     });
});

// update a transaction
export const updateTransaction = CatchAsyncErrors(async (req, res) => {
     const { transactionUUID, transactionData } = req.body;
     let transaction = await transactionModel.findById(transactionUUID);
     await transaction.overwrite(transactionData);
     const updatedTransaction = await transaction.save();
     res.status(200).json({
          success: true,
          data: updatedTransaction
     });
});
