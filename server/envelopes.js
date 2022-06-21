const envelopesRouter = require('express').Router();



let envelopes = [];
let envelopesCounter = 1;

envelopesRouter.post('/', (req, res, next) => {
    const newEnvelope = {
        id: envelopesCounter++,
        title: req.body.title,
        budget: req.body.budget
    }
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
})

envelopesRouter.get('/', (req, res, next) => {
    res.send(envelopes);
})
module.exports = envelopesRouter;
