import request from 'supertest';
import { faker } from '@faker-js/faker';
import { INoteDTO} from 'types';
import { vi, describe, test, expect, beforeAll, afterEach, SpyInstance } from "vitest";

describe('note routes', () => {
    test('getNotes should return a 200 status code', async () => {
        const response = await request('http://localhost:5000/api/notes')
        .get('/');
        expect(response.status).toBe(200);
    })

    test('getNote should return a 200 status code', async () => {
        const response = await request('http://localhost:5000/api/notes')
        .get('/123');
        expect(response.status).toBe(200);
    })

    test('setNote should return a 200 status code when valid payload is send', async () => {
        const payload = {
            topic: faker.lorem.word(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            date: faker.date.past()
        };
        const response = await request('http://localhost:5000/api/notes')
        .post('/')
        .send(payload);
        expect(response.status).toBe(200);
    })

    test('setNote should return a 400 status code when invalid payload is send', async () => {
        const payload = {
            topic: faker.lorem.word(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            date: 'invalid date'
        };
        const response = await request('http://localhost:5000/api/notes')
        .post('/')
        .send(payload);
        expect(response.status).toBe(400);
    })

    test('updateNote should return a 200 status code when valid payload is send', async () => {
        const payload = {
            topic: faker.lorem.word(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            date: faker.date.past()
        };
        const response = await request('http://localhost:5000/api/notes')
        .put('/123')
        .send(payload);
        expect(response.status).toBe(200);
    });

    test('updateNote should return a 400 status code when invalid payload is send', async () => {
        const payload = {
            topic: faker.lorem.word(),
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph(),
            date: 'invalid date'
        };
        const response = await request('http://localhost:5000/api/notes')
        .put('/123')
        .send(payload);
        expect(response.status).toBe(400);
    });

    test('deleteNote should return a 200 status code', async () => {
        const response = await request('http://localhost:5000/api/notes')
        .delete('/123');
        expect(response.status).toBe(200);
    });
})

