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
    // todo
}

module.exports = {
    getEnvelopes,
    createEnvelope,
};

