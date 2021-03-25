const Empire = require('../api/empires-model');

const checkForValidID = async (req, res, next) => {
	const { id } = req.params;
	const empire = await Empire.findById(id);
	if (!empire) {
		return res.status(404).json({
			message: 'Empire official not found.',
		});
	}
	next();
};

module.exports = {
	checkForValidID,
};
