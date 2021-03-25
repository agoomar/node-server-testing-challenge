exports.seed = async function (knex) {
	await knex('empires').truncate();
	await knex('empires').insert([
		{ name: 'Emperor Palpatine' },
		{ name: 'Darth Vader' },
		{ name: 'Commander Tarkin' },
		{ name: 'Emperors Bodyguard' },
	]);
};
