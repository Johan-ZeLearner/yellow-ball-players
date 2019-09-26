const request = require('supertest');
const app     = require('../src/app');

describe('GET /players', () => {
  // the headToHead.json file can change dynamic -
  // we cannot expect a fixed number of players returned by the route.
  test('should returns at least 1 player', async () => {
    const response = await request(app).get('/players');

    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  })
});

describe('GET /players/<id>', () => {
  // the headToHead.json file is potentially dynamic -
  // we cannot expect a fixed number of players returned by the route.
  test('should returns the player with id 102', async () => {
    const response = await request(app).get('/players/102');

    expect(response.statusCode).toEqual(200);
  })

  test('should returns a 404 (user id 666 doesn\'t exists', async () => {
    const response = await request(app).get('/players/666');

    expect(response.statusCode).toEqual(404);
  })

  test('should returns a 404 - id made of chars doesn\'t crash but has no results', async () => {
    const response = await request(app).get('/players/federer');

    expect(response.statusCode).toEqual(404);
  })
});

