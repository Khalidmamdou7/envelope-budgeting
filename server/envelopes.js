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
    const {envelopeId} = req.params;
    const envelope = envelopes.filter((e) => {
        return e.id == envelopeId;
    })
    if (envelope.length){
        res.status(200).send(envelope);
    } else {
        res.sendStatus(404);
    }
})




module.exports = envelopesRouter;
