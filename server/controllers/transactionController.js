import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import transactionModel from "../models/transactionModel";

// Fetch all transactions
export const getAllTransactions = CatchAsyncErrors(async (req, res) => {
  const transactionList = await transactionModel.find({});
  res.status(200).json({
    status: "success",
    data: {
      transactionList
    }
  });
});

// delete transaction
export const deleteTransaction = CatchAsyncErrors(async (req, res) => {
  const { transactionUUID } = req.body;
  const transaction = await transactionModel.findByIdAndDelete(transactionUUID);
  res.status(200).json({
    status: "success",
    data: transaction
  });
});

// create a transaction
export const createTransaction = CatchAsyncErrors(async (req, res) => {
  const { transactionData, transactionDataList } = req.body;
  let returnData;
  if (transactionDataList) {

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

  } else if (transactionData) {

    returnData = await transactionModel.create(transactionData);
    // const transaction = await transactionModel.create(transactionData);
    // returnData = transaction;
  }

  res.status(200).json({
    status: "success",
    data: returnData
  });
});

// update a transaction
export const updateTransaction = CatchAsyncErrors(async (req, res) => {
  const { transactionUUID, transactionData } = req.body;
  let transaction = await transactionModel.findById(transactionUUID);
  await transaction.overwrite(transactionData);
  const updatedTransaction = await transaction.save();
  res.status(200).json({
    status: "success",
    data: updatedTransaction
  });
});
