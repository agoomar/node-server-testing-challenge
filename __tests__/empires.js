const supertest = require('supertest');
const server = require('../server');
const db = require('../data/config');

beforeEach(async () => {
	await db.seed.run();
});

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

afterAll(async () => {
	await db.destroy();
});

describe('Empire integration test', () => {
	it('gets a list of Empire officials', async () => {
		const res = await supertest(server).get('/empires');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.length).toBeGreaterThanOrEqual(4);
		expect(res.body[0].name).toBe('Emperor Palpatine');
	});

	it('Gets Empire official/soldier by Id', async () => {
		const res = await supertest(server).get('/empires/1');
		expect(res.statusCode).toBe(200);
		expect(res.type).toBe('application/json');
		expect(res.body.id).toBe(1);
		expect(res.body.name).toBe('Emperor Palpatine');
	});

	it('returns 404 when Empire is not found', async () => {
		const res = await supertest(server).get('/empires/100');
		expect(res.statusCode).toBe(404);
	});

	it('creates an Empire soldier/official', async () => {
		const res = await supertest(server)
			.post('/empires')
			.send({ name: 'Starkiller' });
		expect(res.statusCode).toBe(201);
		expect(res.type).toBe('application/json');
		expect(res.body.id).toBeDefined();
		expect(res.body.name).toBe('Starkiller');
	});

	it('Deletes an Empire official/soldier', async () => {
		const res = await supertest(server).del('/empires/4');
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe('Successfully eradicated');
	});
});
