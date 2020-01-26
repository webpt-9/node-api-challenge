const express = require('express');
const router = express.Router();
const db = require('../../data/helpers/projectModel.js');
const actionDb = require('../../data/helpers/actionModel.js');
const middleware = require('../middleware.js');

router.get('/', (req, res) => {
	db
		.get()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error getting projects from database', err });
		});
});

router.get('/:id', middleware.validateProjectId, (req, res) => {
	res.status(200).json(req.project);
});

router.post('/', middleware.validateProject, (req, res) => {
	db
		.insert(req.body)
		.then((resource) => {
			res.status(201).json(resource);
		})
		.catch((err) => {
			res.status(500).json({ error: 'error adding project to database' });
		});
});

router.post('/:id/actions', middleware.validateProjectId, middleware.validateAction, (req, res) => {
	const actionInfo = { ...req.body, project_id: req.params.id };

	actionDb
		.insert(actionInfo)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((err) => {
			res.status(500).json({ error: 'unable to create action', err });
		});
});

router.delete('/:id', middleware.validateProjectId, (req, res) => {
	db
		.remove(req.project.id)
		.then((removed) => {
			res.status(200).json({ message: `projects removed ${removed}` });
		})
		.catch((err) => {
			res.status(500).json({ error: 'could not remove project', err });
		});
});

router.put('/:id', middleware.validateProjectId, middleware.validateProject, (req, res) => {
	const changes = req.body;
	const { id } = req.project;

	db
		.update(id, changes)
		.then((records) => {
			res.status(201).json({ message: `record update successful ` });
		})
		.catch((err) => {
			res.status(500).json({ error: 'there was an error updated the project', err });
		});
});

module.exports = router;
