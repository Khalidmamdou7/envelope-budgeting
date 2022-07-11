const envelopesRouter = require('express').Router();
const db = require('./db');

let envelopes = [];
let envelopesCounter = 1;

envelopesRouter.post('/', db.createEnvelope);

envelopesRouter.get('/', db.getEnvelopes);

envelopesRouter.get('/:envelopeId', db.getEnvelopeById);

envelopesRouter.put('/:envelopeId', db.updateEnvelope);

envelopesRouter.delete('/:envelopeId', db.deleteEnvelope);

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

envelopesRouter.post('/transaction', db.transaction);




module.exports = envelopesRouter;
