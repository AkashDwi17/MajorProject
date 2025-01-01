const express = require('express');
const router = express.Router();

// Index
router.get('/', (req, res) => {
    res.send('Get for users');
});

// Show
router.get('/:id', (req, res) => {
    res.send(`Get for user id: ${req.params.id}`);
});

// Post
router.post('/', (req, res) => {
    res.send('Post for user');
});

// Delete
router.delete('/:id', (req, res) => {
    res.send(`Delete for user id: ${req.params.id}`);
});

module.exports = router;
