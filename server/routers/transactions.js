const transactionsRouter = require('express').Router();
const db = require('../db');

transactionsRouter.post('/', db.createTransaction);
transactionsRouter.get('/', db.getTransactions);
transactionsRouter.put('/:transactionId', db.updateTransaction);
transactionsRouter.get('/:username', db.getTransactionsByUserName);
transactionsRouter.delete('/:transactionId', db.deleteTransaction);

module.exports = transactionsRouter;