import request from 'supertest'
import { app } from '../../../app'

describe('Get all rides', () => {
    it('It should be Get all the tasks', async () => {
        const response = await request(app).post('/api/tickets').send();
        expect(response.status).not.toEqual(200);
    })
})