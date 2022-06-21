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

envelopesRouter.get('/:envelopeId', (req, res, next) => {
    if (envelopesCounter == 1 || req.params.envelopeId < 1 || req.params.envelopeId > envelopesCounter){
        res.sendStatus(404);
    } else {
        res.send(envelopes[req.params.envelopeId - 1]);
    }
});
module.exports = envelopesRouter;
