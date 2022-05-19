import prisma from '../../src/database/prisma';
import { tasks } from '../seeders/tasks';
import request from 'supertest';
import { app } from '../../src/api/app';
import { mock }  from '../__mocks__';
import { ITasks } from '../interfaces/ITasks';

describe('Testando a rota /tasks', () => {
  describe('Testando o GET /tasks', () => {
    beforeAll(async () => {
      await prisma.tasks.createMany({ data: tasks });
    });

    afterAll(async () => {
      await prisma.tasks.deleteMany();

      await prisma.$disconnect();
    });

    it('Testando o retorno do getAll', async () => {
      const { body, status } = await request(app).get('/tasks');

      expect(status).toBe(200);
      expect(body.data).toBeDefined();

      body.data.forEach((e: ITasks) => {
        expect(e.updatedAt).toBeDefined();
        expect(e.createdAt).toBeDefined();

        delete e.updatedAt;
        delete e.createdAt;
      });

      expect(body.data).toStrictEqual(mock.tasks);
    });
  });

  describe('Testando o DELETE /tasks/:id', () => {
    beforeAll(async () => {
      await prisma.tasks.createMany({ data: tasks });
    });

    afterAll(async () => {
      await prisma.tasks.deleteMany();

      await prisma.$disconnect();
    });

    it('Testando o delete task', async () => {
      const { status: firstStatus } = await request(app).delete('/tasks/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f');

      const { status: secondStatus, body } = await request(app).delete('/tasks/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f');

      expect(firstStatus).toBe(204);
      expect(secondStatus).toBe(404);
      expect(body).toStrictEqual({ data: { message: { error: 'Task Not Found' } } });
    });
  });
});
