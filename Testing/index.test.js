const request = require('supertest');
const app = require('./index');

describe('API Tests', () => {
    it('GET /api/health should return status ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: 'ok' });
    });

    it('POST /api/user with name should return 201', async () => {
        const res = await request(app).post('/api/user').send({ name: 'Alice' });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User Alice created');
    });

    it('POST /api/user without name should return 400', async () => {
        const res = await request(app).post('/api/user').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Name is required');
    });  
});


// const request = require('supertest');
// const app = require('./index');

// describe('API Tests', () => {
//     it('GET/api/health should return status ok', async () => {
//         const res = await request(app).get('/api/health');
//         expect(res.statusCode).toBe (200);
//         expect(res.body).toEqual({ status: 'ok'});
//     });

//     it('POST/api/user with name should return 201', async () => {
//         const res = await request(app)
//         .post('/api/user')
//         .send({name: 'Alice' });
//         expect(res.statusCode).toBe (201);
//         expect(res.body.message).toBe('User Alice created');
//     });
    
//     it('POST/api/user without name should return 400', async () => {
//         const res = await request(app).post('/api/user').send({});
//         expect(res.statusCode).toBe(400);
//         expect(res.statusCode).toBe (400); expect(res.body.error).toBe('Name is required');
//     });
// });