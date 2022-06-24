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
        res.status(200).send(envelope[0]);
    } else {
        res.sendStatus(404);
    }
})

envelopesRouter.put('/:envelopeId', (req, res, next) => {
    try {
        const {envelopeId} = req.params;
        const envelope = envelopes.filter((e) => {
            return e.id == envelopeId;
        })
        if (envelope.length){
            const {title, budget} = req.body;
            envelope[0].title = title;
            envelope[0].budget = budget;
            res.status(201).send(envelope[0]);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
    
})

envelopesRouter.delete('/:envelopeId', (req, res, next) => {
    try {
        const {envelopeId} = req.params;
        const envelopeIndex = envelopes.findIndex((e) => {
            return e.id == envelopeId;
        })
        if (envelopeIndex != -1){
            envelopes.splice(envelopeIndex, 1);
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
    
})

envelopesRouter.post('/transfer/:from/:to', (req, res, next) => {
    try {
        const {from, to} = req.params;
        const {value} = req.body;
        
        const fromEnvleope = envelopes.find((e) => {
            return e.id == from;
        })
        const toEnvelope = envelopes.find((e) => {
            return e.id == to;
        })
        if (fromEnvleope && toEnvelope){
            if (fromEnvleope.budget >= value){
                fromEnvleope.budget -= value;
                toEnvelope.budget += value;
                res.sendStatus(200);
            } else {
                res.status(400).send({
                    message: "Amount to transfer exceeds the amount in the envelope"
                })
            }
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send(err);
    }
    
})





module.exports = envelopesRouter;
