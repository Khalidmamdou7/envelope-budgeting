const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.send('Hello World from apiRouter!')
})

const envelopesRouter = require('./routers/envelopes')
apiRouter.use('/envelopes', envelopesRouter)

const transactionsRouter = require('./routers/transactions')
apiRouter.use('/transactions', transactionsRouter)

module.exports = apiRouter;