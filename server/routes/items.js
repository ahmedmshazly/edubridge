const express = require('express');
const router = express.Router();

// Sample data
let items = [
    { id: 1, name: 'Item One' },
    { id: 2, name: 'Item Two' }
];

// GET route for listing items
router.get('/', (req, res) => {
    res.json(items);
});

// POST route for adding a new item
router.post('/', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).send(newItem);
});

module.exports = router;
