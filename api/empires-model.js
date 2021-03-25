const db = require('../data/config');

const find = () => {
	return db('empires');
};

const findById = (id) => {
	return db('empires').where({ id }).first();
};

const create = async (shelby) => {
	const [id] = await db('empires').insert(shelby);

	return findById(id);
};

const nuke = (id) => {
	return db('empires').where({ id }).del();
};

module.exports = {
	find,
	findById,
	create,
	nuke,
};
