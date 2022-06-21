const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.send('Hello World from apiRouter!')
})

const envelopesRouter = require('./envelopes')
apiRouter.use('/envelopes', envelopesRouter)


module.exports = apiRouter;