const express = require('express')
const app = express()
const port = 3000

// testing server
app.get('/', (req, res, next) => {
    res.send('Hello World!')
})


// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const apiRouter = require('./server/api')
app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`Personal Budget app listening on port ${port}`)
})