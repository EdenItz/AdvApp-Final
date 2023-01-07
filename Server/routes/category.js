const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        let category = await Category.find();
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send('Error in get Category');
    }
});

module.exports = router;
