const express = require('express');
const db = require('../data/config');
const Empire = require('./empires-model');
const { checkForValidID } = require('../middleware/empires');
const router = express.Router();

// Gets all the important people under the Empire
router.get('/', async (req, res, next) => {
	try {
		const empires = await Empire.find();
		res.json(empires);
	} catch (err) {
		next(err);
	}
});

// Get an Empire official by ID
router.get('/:id', checkForValidID, async (req, res, next) => {
	try {
		const empire = await Empire.findById(req.params.id);
		res.json(empire);
	} catch (err) {
		next(err);
	}
});

// Create an Empire soldier/official
router.post('/', async (req, res, next) => {
	try {
		const empire = await Empire.create(req.body);
		res.status(201).json(empire);
	} catch (err) {
		next(err);
	}
});

// Delete an Empire soldier/official
router.delete('/:id', checkForValidID, async (req, res, next) => {
	try {
		await Empire.nuke(req.params.id);
		res.json({
			message: 'Successfully eradicated',
		});
	} catch (err) {
		next(err);
	}
});
module.exports = router;
