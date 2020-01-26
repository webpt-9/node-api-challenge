const db = require('../data/helpers/projectModel.js');

module.exports = {
	validateProjectId: function(req, res, next) {
		const { id } = req.params;
		db
			.get(id)
			.then((resource) => {
				if (resource === null) {
					res.status(400).json({ error: 'invalid project id' });
				} else {
					req.project = resource;
					next();
				}
			})
			.catch((err) => {
				res.status(500).json({ error: 'there was a problem getting the project', err });
			});
	},

	validateProject: function(req, res, next) {
		const body = req.body;

		if (body.name && body.description && body.completed) {
			next();
		} else if (Object.keys(body).length > 0) {
			res.status(400).json({ error: 'missing required fields, either name, description, or completed field.' });
		} else {
			res.status(400).json({ error: 'missing project data' });
		}
	},

	validateAction: function(req, res, next) {
		const body = req.body;

		if (body.description && body.notes && body.completed) {
			next();
		} else if (Object.keys(body).length > 0) {
			res.status(400).json({ error: 'missing required fields, either notes, description, or completed field.' });
		} else {
			res.status(400).json({ error: 'missing project data' });
		}
	}
};
