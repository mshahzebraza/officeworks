#### Title

Trying to create a `mongo` document from each item of an array.

#### Task

I have an Array `TransactionList` and i intend to create a document with each `Transaction` of `TransactionList`.
Code for the Task is as:

```
// CodeBlock_01 --- start
const finalTransactionList = [];
// CodeBlock_01 --- end

// CodeBlock_02 --- start
TransactionList.forEach(
  async (transaction) => {

    const newTransaction = await transactionModel.create(transaction)

    finalTransactionList.push(newTransaction);
  }
);
// CodeBlock_02 --- end

// CodeBlock_03 --- start
console.log("List of added Transactions: ",finalTransactionList)
// CodeBlock_03 --- end

// CodeBlock_04 --- start
res.status(200).json({
  status: "success",
  data: finalTransactionList
});
// CodeBlock_04 --- end

```

#### Problem

I expect the `finalTransactionList` to contain all the documents that have been added to `mongoDB`. However, logging it to console shows that its empty (`mongoDB` shows that the documents have been added successfully).

#### What's actually happening?

Somehow, the **forEach block** doesn't await the code execution and the execution of remaining code (CodeBlock\_& 4) continues.
Therefore, the "logging of finalTransactionList" and returning of response happens before the completion of async code inside the **forEach block**. (I've tried using "await" behind it but doesn't stop code execution there.)

#### Solution(s)

According to a **Stack Overflow Answer (Resource #01)**, there are 02 possible ways to go about it.

##### Use `ForOf` (preferred)

Replacing `ForEach` with `ForOf` makes the asynchronous operations on the array items respect the `await` keyword. (which was not the case with `forEach`.)
CodeBlock_02 was replaced with this code:

```
// Alternative_01 of CodeBlock_02 --- start

for (const transaction of transactionDataList) {
    const newTransaction = await transactionModel.create(transaction);
    txnList.push(newTransaction);
  }

// Alternative_01 of CodeBlock_02 --- end
```

**Note:**
A simple for loop also works. According to a comment in the Resource-01

> ok i know why... Using Babel will transform async/await to generator function and using forEach means that each iteration has an individual generator function, which has nothing to do with the others. so they will be executed independently and has no context of next() with others. Actually, a simple for() loop also works because the iterations are also in one single generator function.

This method works on **Sequential Execution** i.e. ensures that the requests are returned in the order they have been written. If any of them fails, the others will still be returned.

##### Use `map` && `Promise.all()`

Replacing `ForEach` with `map` && wrapping the code in `Promise.all()` also works.
CodeBlock_02 was replaced with this code:

```
// Alternative_02 of CodeBlock_02 --- start

await Promise.all(
  transactionDataList.map(async (transaction) => {
    const newTransaction = await transactionModel.create(transaction)
    txnList.push(newTransaction);
  }
  )
)

// Alternative_02 of CodeBlock_02 --- end
```

This method works on **Parallel Execution** i.e. the results from the promises(array in this case) will be shown all at once. and if any of them fails -> all will fail.

**Note:**
Keep in mind that:

- using `map` instead of `forEach` is **necessary** even when we don't use the returned values (Promises in this case).
- using `async-await` for each of the `callback` of `map` is also important to make the code work

<!-- #### Issue -->

### Resources

1. This [answer on Stack Overflow](https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop) shows 02 ways to solve the issue. Multiple other solutions can be found in multiple answers against the question and also in the comments.
2. This [Youtube Video](https://www.youtube.com/watch?v=01RTj1MWec0) tells more about Solution #02.
