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
     const { transactionUUID } = req.query;
     if (!transactionUUID) throw new Error('Please provide a valid transactionUUID')

     const deletedTransaction = await transactionModel.findByIdAndDelete(transactionUUID, { new: true });
     console.log("deletedTransaction", deletedTransaction);

     // if deletion fails, return error
     if (!deletedTransaction) throw new Error('Unsuccessful to delete Transaction!')

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
     const isMultipleDataPassed = transactionDataList?.length > 0 && !transactionData;
     // ? Each data-set of transactionDataList must be converted to a single transaction. 
     // ? If transactionDataList is empty, then create a single transaction against the transactionData.
     let returnData;

     if (isMultipleDataPassed) {
          returnData = [];
          // let txnList = [];
          // add each of the incoming transactions to the database

          // *Working Alternative 01 (PC-01): replaced the above forEach loop with a forOf loop. This works on sequential execution.
          for (const transaction of transactionDataList) {
               const newTransaction = await transactionModel.create(transaction);
               // txnList.push(newTransaction);
               returnData.push(newTransaction);
          }

          // returnData = txnList;

     } else if (!isMultipleDataPassed) {

          returnData = await transactionModel.create(transactionData);
          // const transaction = await transactionModel.create(transactionData);
          // returnData = transaction;
     }

     res.status(200).json({
          success: true,
          message: `
          ${isMultipleDataPassed ? "Multiple" : "Single"}
          ${"Transaction(s) created successfully!"}
          `,
          data: {
               [isMultipleDataPassed ? "createdTxnList" : "createdTxn"]: returnData
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
