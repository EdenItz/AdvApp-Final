const Order = require('../models/Order');
const errorHandler = require('../globals').errorHandler;

const upsertOrder = async (req, res) => {
    if (!!req.body._id) {
        const filter = { _id: req.body._id };

        Order.findOneAndUpdate(filter, req.body, {
            new: true,
            upsert: true,
        })
            .then(() => {
                res.send(true);
            })
            .catch(errorHandler(res));
    } else {
        const ord = new Order(req.body);

        ord.save()
            .then(() => {
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

module.exports = {
    upsertOrder,
};
