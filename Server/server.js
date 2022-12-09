const express = require('express');
const bodyParser = require('body-parser');
// TODO: productDb
const productDB = require('./controllers/product');
const product = require('./routes/product');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');

//Set the DATABASE URI //TODO: NEW DB URL
const URI =
    // 'mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]'
    //'mongodb+srv://edencluster.qiwgfwf.mongodb.net/myFirstDatabase';
    'mongodb+srv://edClust123:SkA9xy2r6ldGHSB4@edencluster.qiwgfwf.mongodb.net/test';
// 'mongodb+srv://edClust123:SkA9xy2r6ldGHSB4.uynif.mongodb.net/AdvPRog?retryWrites=true&w=majority';

//Set the express
const app = express();
const http = require('http');
const server = http.createServer(app);

//Set the port
const port = 3000;

app.use(cors);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

// TODO: Product route
app.use('/Products', product);

const onStartup = async () => {
    connectDB(URI);

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );
};

onStartup();
