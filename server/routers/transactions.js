const transactionsRouter = require('express').Router();
const db = require('../db');

transactionsRouter.post('/', db.createTransaction);

module.exports = transactionsRouter;