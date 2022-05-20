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

        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroMax);
      });

      it('Testando o updatedContent das tasks quando o content é um numero', async () => {
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

      it('Testando o updatedContent onde o content não é passado', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedContent.responseErroNoField);
      });
    })
  });

  describe('Testando o PATCH /tasks/status/:id', () => {
    beforeAll(async () => {
      await prisma.tasks.createMany({ data: tasks });
    });

    afterAll(async () => {
      await prisma.tasks.deleteMany();

      await prisma.$disconnect();
    });

    it('Testando o updatedStatus das tasks quando dá tudo certo', async () => {
      const { body, status } = await request(app)
      .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
      .send(mock.updatedStatus.request);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body.data).toStrictEqual(mock.updatedStatus.response);
    });

    describe('Testando caso de erros do updatedContent', () => {
      it('Testando o updatedStatus vem diferente de IN_PROGRESS | DONE | PEDDING', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedStatus.requestErrorStatus);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedStatus.responseErrorStatus);
      });

      it('Testando o updatedContent das tasks quando não tem o id encontrado', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/notHaveId')
        .send(mock.updatedStatus.request);

        expect(status).toBe(404);
        expect(body.data).toStrictEqual(mock.updatedStatus.responseErrorNotFound);
      });

      it('Testando o updatedStatus onde o status é um numero', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedStatus.requestErroNotStr);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedStatus.responseErroNotStr);
      });

      it('Testando o updatedStatus onde o status é vazio', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        .send(mock.updatedStatus.requestErroEmptyStr);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedStatus.responseErroEmptyStr);
      });

      it('Testando o updatedStatus onde o status não é passado', async () => {
        const { body, status } = await request(app)
        .patch('/tasks/status/0f7446c3-43a1-4e49-b3ce-443bc3b81d2f')
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.updatedStatus.responseErroNoField);
      });
    })
  });

  describe('Testando o POST /tasks', () => {
    beforeAll(async () => {
      await prisma.tasks.createMany({ data: tasks });
    });

    afterAll(async () => {
      await prisma.tasks.deleteMany();

      await prisma.$disconnect();
    });

    it('Testando o create das tasks quando dá tudo certo', async () => {
      const { body, status } = await request(app)
      .post('/tasks')
      .send(mock.createTask.request);

      expect(status).toBe(201);
      expect(body.data).toBeDefined();
      expect(body.data.id).toBeDefined();
      expect(body.data.content).toEqual(mock.createTask.response.content);
      expect(body.data.status).toEqual(mock.createTask.response.status);
    });

    describe('Testando caso de erros do create', () => {
      it('Testando o updatedStatus vem diferente de IN_PROGRESS | DONE | PEDDING', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErrorStatus);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErrorStatus);
      });

      it('Testando o create onde o status é um numero', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroNotStrStatus);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroNotStrStatus);
      });

      it('Testando o create onde o status é vazio', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroEmptyStrStatus);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroEmptyStrStatus);
      });

      it('Testando o create onde o status não é passado', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroNoField);
      });

      it('Testando o create onde o content é um numero', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroNotStrContent);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroNotStrContent);
      });

      it('Testando o create onde o content é vazio', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroEmptyStrContent);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroEmptyStrContent);
      });

      it('Testando o create onde o content tem 1 caracter', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroMinContent);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroMinContent);
      });

      it('Testando o create onde o content tem 50 caracteres', async () => {
        const { body, status } = await request(app)
        .post('/tasks')
        .send(mock.createTask.requestErroMaxContent);
        
        expect(status).toBe(400);
        expect(body).toStrictEqual(mock.createTask.responseErroMaxContent);
      });
    })
  });
});
