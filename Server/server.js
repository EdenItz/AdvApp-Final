const express = require('express');
const bodyParser = require('body-parser');
const productDB = require('./controllers/product');
const orderDB = require('./controllers/order');
const product = require('./routes/product');
const order = require('./routes/order');
const connectDB = require('./db/connect');
const cors = require('./middleware/cors');

const URI =
    'mongodb+srv://edClust123:SkA9xy2r6ldGHSB4@edencluster.qiwgfwf.mongodb.net/AdvApp?retryWrites=true&w=majority';

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

app.use('/products', product);
app.use('/orders', order);

const onStartup = async () => {
    connectDB(URI);

    server.listen(port, () =>
        console.log(`Server is listening on port ${port}...`),
    );
};

onStartup();
