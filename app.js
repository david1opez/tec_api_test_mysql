const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/route')

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.get('/', (req, res) => {
    res.send('API de Mediciones');
});

app.listen(port, () => {
    console.log('Server started running on : ' + port)
})