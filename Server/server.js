const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const expressWs = require('express-ws')(app);
const aWss = expressWs.getWss('/');
const PORT = process.env.PORT || 3000;

// ** Imports
const logger = require('./middleware/logger');
// const register = require('./routes/register'); -- next
// const login = require('./routes/login'); -- next
// const profile = require('./routes/profile'); -- next
// const users = require('./routes/users'); -- next
const user = require('./routes/user');
const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const category = require('./routes/category');
const webSocketHandler = require('./helpers/webSocketHandler')(aWss);
const cors = require('cors');

const DB_URL = process.env.db || 'mongodb://127.0.0.1:27017/AdvApp';

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Logger
app.use(logger);

// DB Connection
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(err => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

// End Points
// app.use('/api/register', register); -- next
// app.use('/api/login', login); -- next
// app.use('/api/profile', profile); -- next
// app.use('/api/all-users', users); -- next

app.use('/api/profile', user);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/carts', cart);
app.use('/api/order', order);
app.use('/api/carts/delete-product', cart);
app.use('/api/category', category);

app.ws('*', (ws, req) => webSocketHandler.websocketUserCounter(ws, req));

app.listen(PORT, () => console.log('API server started on port - ', PORT));
