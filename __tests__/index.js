const supertest = require('supertest');
const server = require('../server');

test('Welcome to the Empire', async () => {
	const res = await supertest(server).get('/');

	//assertions
	expect(res.statusCode).toBe(200);
});
