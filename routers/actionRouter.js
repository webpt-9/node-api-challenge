const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel.js');
const middleware = require('./middleware.js');

router.put('/:id', middleware.validateActionId, (req, res) => {
	const changes = req.body;
	const { id } = req.action;

	db.update(id, changes).then((updated) => {
		res.status(201).json({ message: ' record update successful' });
	});
});

router.delete('/:id', middleware.validateActionId, (req, res) => {
	db
		.remove(req.action.id)
		.then((removed) => {
			res.status(201).json({ message: 'action removed' });
		})
		.catch((err) => {
			res.status(500).json({ error: 'unable to remove project', err });
		});
});

router.get('/', (req, res) => {
	db
		.get()
		.then((actions) => {
			res.status(200).json(actions);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error getting actions' });
		});
});

module.exports = router;
