const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

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
const auth = require('./routes/auth');
const product = require('./routes/product');
const cart = require('./routes/cart');
const category = require('./routes/category');
const webSocketHandler = require('./helpers/webSocketHandler')(aWss);
const cors = require('cors');



const dbUrl = process.env.db || 'mongodb://localhost:27017/AdvApp';

app.use(express.json());
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Logger
app.use(logger);

// DB Connection
mongoose
    .connect(dbUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Cannot connect to server'));

// End Points
// app.use('/api/register', register); -- next
// app.use('/api/login', login); -- next
// app.use('/api/profile', profile); -- next
// app.use('/api/all-users', users); -- next

app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/carts', cart);
app.use('/api/carts/delete-product', cart);
app.use('/api/category', category);

app.ws('/',  (ws, req) => webSocketHandler.websocketUserCounter(ws, req));

app.listen(PORT, () => console.log('API server started on port - ', PORT));
