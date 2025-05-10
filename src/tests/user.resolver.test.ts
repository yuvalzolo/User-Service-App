import request from 'supertest';

const API_URL = 'http://localhost:4000';

let createdUserId: string;
describe('UserResolver GraphQL API (Docker backend)', () => {
    it('responds to getUsers query', async () => {
        const response = await request(API_URL)
            .post('/')
            .send({
                query: `query { getUsers { id first_name last_name city } }`
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.data.getUsers).toBeDefined();
        expect(Array.isArray(response.body.data.getUsers)).toBe(true);
    });
    it('creates a new user', async () => {
        const mutation = `
      mutation CreateUser($first_name: String!, $last_name: String!, $birth_date: String!, $city: City!) {
        createUser(first_name: $first_name, last_name: $last_name, birth_date: $birth_date, city: $city) {
          id
          first_name
          last_name
          city
        }
      }
    `;

        const variables = {
            first_name: 'Test',
            last_name: 'User',
            birth_date: new Date().toISOString(),
            city: 'TEL_AVIV'
        };

        const res = await request(API_URL)
            .post('/')
            .send({ query: mutation, variables });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.createUser.id).toBeDefined();
        expect(res.body.data.createUser.city).toBe('TEL_AVIV');

        createdUserId = res.body.data.createUser.id;
    });

    it('updates an existing user', async () => {
        const mutation = `
      mutation UpdateUser($id: ID!, $first_name: String!, $last_name: String!, $birth_date: String!, $city: City!) {
        updateUser(id: $id, first_name: $first_name, last_name: $last_name, birth_date: $birth_date, city: $city) {
          id
          first_name
          city
        }
      }
    `;

        const variables = {
            id: createdUserId,
            first_name: 'Updated',
            last_name: 'User',
            birth_date: new Date().toISOString(),
            city: 'HAIFA'
        };

        const res = await request(API_URL)
            .post('/')
            .send({ query: mutation, variables });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.updateUser.first_name).toBe('Updated');
        expect(res.body.data.updateUser.city).toBe('HAIFA');
    });

    it('deletes the user', async () => {
        const mutation = `
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `;

        const res = await request(API_URL)
            .post('/')
            .send({ query: mutation, variables: { id: createdUserId } });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.deleteUser).toBe(true);
    });

    it('fails to create a user with missing fields', async () => {
        const mutation = `
      mutation {
        createUser(first_name: "A", last_name: "B", birth_date: "2023-01-01T00:00:00Z") {
          id
        }
      }
    `;

        const res = await request(API_URL)
            .post('/')
            .send({ query: mutation });

        expect(res.statusCode).toBe(400);
        expect(res.body.errors).toBeDefined();
    });
});
