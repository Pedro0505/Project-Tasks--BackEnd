# Como iniciar o projeto

Clone o projeto

```bash
  git clone git@github.com:Pedro0505/Project-Tasks-BackEnd.git
```

Entre no diretório do projeto

```bash
  cd Project-Tasks-BackEnd
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm start
```

Acesse a aplicação usando o seguinte endereço

```bash
  localhost:3001
```

⚠️ Para rodar localmente é necessário ter o mysql instalado na sua máquina ⚠️

<br />

# Como iniciar o projeto com docker 🐳

⚠️ Para garantir um bom funcionamento recomendo que tenha instalado docker-compose na versão 1.29 ou superior ⚠️

<br />

Clone o projeto

```bash
  git clone git@github.com:Pedro0505/Project-Tasks-BackEnd.git
```

Entre no diretório do projeto

```bash
  cd Project-Tasks-BackEnd
```

Suba os containers

```bash
  docker-compose up --build -d
```

Entre no container

```bash
  docker-compose exec task-manager-backend sh
```

Execute o seguinte comando para criar o banco

```bash
  npx prisma migrate reset --force --schema src/database/prisma/schema.test.prisma
```

Acesse a aplicação usando o seguinte endereço

```bash
  localhost:3001
```

<br />
<br />

# Utilizando os endpoints

### Retornar todas as tasks

```plaintext
  GET /tasks
```

### O que é retornado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | O id da sua task |
| `content` | `string` | O conteúdo da sua task |
| `createdAt` | `Date` | Data de criação da sua task |
| `updatedAt` | `Date` | Data de atualização da sua task |
| `tasksStatus` | `string` | O status da sua task |

<br />

Exemplo de retorno

```json
{
  "data": [
      {
  	"id": "0f7446c3-43a1-4e49-b3ce-443bc3b81d2f",
	"content": "Fazer projeto TFC",
	"createdAt": "2022-05-20T09:40:48.133Z",
	"updatedAt": "2022-05-20T09:40:48.134Z",
	"tasksStatus": "DONE"
      },
      {
	"id": "8c96ea7c-ff45-4c25-8a36-123d3c254bfc",
 	"content": "Fazer projeto Store Manager",
	"createdAt": "2022-05-20T09:40:48.133Z",
	"updatedAt": "2022-05-20T09:40:48.134Z",
	"tasksStatus": "IN_PROGRESS"
      }
   ]
}
```
<br />

### Criar uma nova tasks

```plaintext
  POST /tasks
```

Exemplo de requisição

```json
{
   "content": "Terminar o projeto de ontem",
   "status": "PEDDING"
}
```

### O que pode ser enviado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `content` | `string` | **Obrigatório**. O conteúdo da sua task |
| `tasksStatus` | `string` | **Opicional**. O status da sua task (Se não for mandado vai assumir o valor de PENDING) |

<br />

Exemplo de retorno

```json
{
   "data": {
      "id": "3618a756-0149-4552-b216-c1a94cf1b084",
      "content": "Terminar o projeto de ontem",
      "status": "PEDDING"
   }
}
```

### O que é retornado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | O id da sua task |
| `content` | `string` | O conteúdo da sua task |
| `tasksStatus` | `string` | O status da sua task |

<br />

### Deletando uma tasks

```plaintext
  DELETE /tasks/:id
```

Exemplo de retorno

```json
  No Body Response
```

### O que pode ser enviado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `/:id` | `param` | **Obrigatório**. Vai ser o id da sua task que deverar ser excluida, passando ela pelo parâmetro da rota |

<br />

### Atualizando o conteúdo de uma tasks

```plaintext
  PUT /tasks/content/:id
```

Exemplo de requisição

```json
{
   "content": "Tarefa atualizada"
}
```

### O que pode ser enviado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `/:id` | `param` | **Obrigatório**. Vai ser o id da sua task que deverar ser alterado, passando ela pelo parâmetro da rota |
| `content` | `string` | **Obrigatório**. O conteúdo da sua task |


<br />

Exemplo de retorno

```json
{
   "data": {
      "id": "0f7446c3-43a1-4e49-b3ce-443bc3b81d2f",
      "content": "Tarefa atualizada"
   }
}
```
### O que é retornado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | O id da sua task |
| `content` | `string` | O conteúdo da sua task |

<br />

### Atualizando o status de uma tasks

```plaintext
  PUT /tasks/status/:id
```

Exemplo de requisição

```json
{
   "status": "DONE"
}
```

### O que pode ser enviado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `/:id` | `param` | **Obrigatório**. Vai ser o id da sua task que deverar ser alterado, passando ela pelo parâmetro da rota |
| `tasksStatus` | `string` | **Opicional**. O status da sua task (Se não for mandado vai assumir o valor de PENDING) |

<br />

Exemplo de retorno

```json
{
   "data": {
      "id": "0f7446c3-43a1-4e49-b3ce-443bc3b81d2f",
      "status": "DONE"
   }
}
```

### O que é retornado

<br />

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | O id da sua task |
| `tasksStatus` | `string` | O status da sua task |

<br />

## Stack utilizada

- Node
- Express
- Joi
- Jest
- Prisma
- Typescript
- MySql

<br />

## Paradigmas

- OOP
- Rest Api
- Solid
- DDD
