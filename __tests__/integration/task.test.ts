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

    it('Testando o delete task quando o id não é encontrado', async () => {
      const { status, body } = await request(app).delete('/tasks/notFoundID');

      expect(status).toBe(404);
      expect(body).toStrictEqual({ data: { message: { error: 'Task Not Found' } } });
    });
  });

  describe('Testando o PATCH /tasks/content/:id', () => {
    beforeAll(async () => {
      await prisma.tasks.createMany({ data: tasks });
    });

    afterAll(async () => {
      await prisma.tasks.deleteMany();

      await prisma.$disconnect();
    });

    it('Testando o updatedContent das tasks quando dá tudo certo', async () => {
      const { body, status } = await request(app)
      .patch('/tasks/content/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
      .send(mock.updatedContent.request);
      
      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(mock.updatedContent.response);
    });

    describe('Testando caso de erros do updatedContent', () => {
      it('Testando o updatedContent das tasks quando o content vem vazio', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/content/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedContent.requestErroEmptyStr);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroEmptyStr);
      });

      it('Testando o updatedContent das tasks quando o content so tem um caracter', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/content/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedContent.requestErroMin);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroMin);
      });

      it('Testando o updatedContent das tasks quando o content tem mais de 50 caracteres', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/content/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedContent.requestErroMax);

        console.log(mock.updatedContent.requestErroMax)
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroMax);
      });

      it('Testando o updatedContent das tasks quando o content não é um numero', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/content/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedContent.requestErroNotStr);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroNotStr);
      });

      it('Testando o updatedContent das tasks quando não tem o id encontrado', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/content/notHaveId')
        .send(mock.updatedContent.request);
        
        expect(status).toBe(404);
        expect(body).toStrictEqual(mock.updatedContent.responseErrorNotFound);
      });
    })
  });
});
