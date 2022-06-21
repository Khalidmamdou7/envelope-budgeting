const envelopesRouter = require('express').Router();

envelopesRouter.get('/', (req, res, next) => {
    res.send('Hello World from envelopesRouter!')
})

let envelopes = [];
let envelopesCounter = 1;

envelopesRouter.post('/', (req, res, next) => {
    const newEnvelope = {
        id: envelopesCounter++,
        title: req.body.title,
        budget: req.body.budget
    }
    res.status(201).send(newEnvelope);
})

module.exports = envelopesRouter;
