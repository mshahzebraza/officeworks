import CatchAsyncErrors from "../middlewares/CatchAsyncErrors";
import transactionModel from "../models/transactionModel";

// Fetch all transactions
export const getAllTransactions = CatchAsyncErrors(async (req, res) => {
  const transactionList = await transactionModel.find();
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
  console.log("many: ", many);

  let transactionList = [];
  if (many) {
    // console.log("transactionDataList: ", transactionDataList);
    transactionDataList.forEach(async transaction => {
      const newTransaction = await transactionModel.create(transaction);
      // console.log("newTransaction *", newTransaction);
      transactionList.push({ ...newTransaction });
    });
    console.log("transactionList in controller: ", transactionList);
    // const transactionList = await transactionModel.create(transactionDataList);

    res.status(200).json({
      status: "success",
      data: transactionList
    });
  } else {
    console.log("transactionData: ", transactionData);
    const transaction = await transactionModel.create(transactionData);
    res.status(200).json({
      status: "success",
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
