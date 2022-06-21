const envelopesRouter = require('express').Router();

envelopesRouter.get('/', (req, res, next) => {
    res.send('Hello World from envelopesRouter!')
})

module.exports = envelopesRouter;
