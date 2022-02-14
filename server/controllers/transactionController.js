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
  const { transactionData, transactionDataList, many } = req.body;

  if (many) {

    let txnList = [];

    // add each of the incoming transactions to the database

    // !Problematic Code 01: Code execution doesn't stop here and continues to the code below. Therefore, the response is returned before txnList is populated.
    /* await transactionDataList.forEach(
      async (transaction) => {
        const newTransaction = await transactionModel.create(transaction)
        txnList.push(newTransaction);
      }
    ); */

    // *Working Alternative 01 (PC-01): replaced the above forEach loop with a forOf loop. This works on sequential execution.
    for (const transaction of transactionDataList) {
      const newTransaction = await transactionModel.create(transaction);
      txnList.push(newTransaction);
    }

    // *Working Alternative 02 (PC-02): replaced the above forEach loop with map() and Promise.all(). This works on parallel execution.
    /* await Promise.all(
      transactionDataList.map(async (transaction) => {
        const newTransaction = await transactionModel.create(transaction)
        txnList.push(newTransaction);
      }
      )
    ) */

    res.status(200).json({
      status: "success",
      message: "Multiple transactions received",
      data: txnList
    });


  } else {
    console.log("transactionFormData @ create: ", transactionData);

    const transaction = await transactionModel.create(transactionData);

    console.log("transaction created single: ", transaction);

    res.status(200).json({
      status: "success",
      // message: "Single Transaction received",
      data: transaction
    });
  }
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
