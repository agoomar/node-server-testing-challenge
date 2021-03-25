exports.up = async function (knex) {
	await knex.schema.createTable('empires', (table) => {
		table.increments();
		table.text('name').notNull();
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('empires');
};
