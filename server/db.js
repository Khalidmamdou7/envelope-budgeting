const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me', 
    host: 'localhost',
    database: 'envelopebudgeting',
    password: 'khalid',
    port: 5432,
})

const getEnvelopes = (req, res) => {
    pool.query('SELECT * from envelopes ORDER BY id ASC', (error, results) => {
        if (error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const createEnvelope = (req, res) => {
    const {title, budget} = req.body;
    pool.query('INSERT INTO envelopes (title, budget) values ($1, $2) returning *', [title, budget], (error, results) => {
        if (error){
            throw error;
        }
        res.status(201).send(`Envelope added with ID: ${results.rows[0].id}`);
    })
}

const getEnvelopeById = (req, res) => {
    const id = parseInt(req.params.envelopeId);
    pool.query(
        'SELECT * from envelopes where id = $1', [id],
        (error, results) => {
            if (error){
                throw error;
            }
            if (results.rowCount > 0){
                res.status(200).json(results.rows);
            } else {
                res.sendStatus(404);
            }
        }
    )

}

const updateEnvelope = (req, res) => {
    const id = parseInt(req.params.envelopeId);
    const {title, budget} = req.body;
    pool.query(
        'UPDATE envelopes set title = $1, budget = $2 where id = $3', 
        [title, budget,  id],
        (error, results) => {
            if (error){
                throw error;
            }
            res.status(201).send(`Envelope modified with id: ${id}`);
        }
    )
}

const deleteEnvelope = (req, res) => {
    const id = parseInt(req.params.envelopeId);

    pool.query('DELETE FROM envelopes WHERE id = $1', [id], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Envelope deleted with ID: ${id}`);
      })
}

const transaction = (req, res) => {
    const {username, value, envelopeId} = req.body;

    pool.query(
        'INSERT INTO transactions (username, value, envelope_id, time) values($1, $2, $3, NOW()) returning *', 
        [username, value, envelopeId], 
        (error, results) => {
            if (error){
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
}

module.exports = {
    getEnvelopes,
    createEnvelope,
    getEnvelopeById,
    updateEnvelope,
    deleteEnvelope, 
    transaction,
};

