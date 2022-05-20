export const tasks = [
  {
    id: '0f7446c3-43a1-4e49-b3ce-443bc3b81d2f',
    content: 'Fazer projeto TFC',
    tasksStatus: 'DONE'
  },
  {
    id: '8c96ea7c-ff45-4c25-8a36-123d3c254bfc',
    content: 'Fazer projeto Store Manager',
    tasksStatus: 'IN_PROGRESS'
  },
  {
    id: '9812ff40-6053-49e3-b604-0bcd74648dd9',
    content: 'Fazer projeto Zoo Functions',
    tasksStatus: 'PEDDING'
  },
  {
    id: 'a7f00f69-161f-431b-bb31-32349bf6b967',
    content: 'Fazer projeto Shopping Cart',
    tasksStatus: 'PEDDING'
  },
  {
    id: 'b627e88f-9393-4a74-9839-89e22a621059',
    content: 'Fazer projeto Blogs Api',
    tasksStatus: 'DONE'
  }
]

export const updatedContent = {
  request: { content: "Refazendo o ultimo requisito" },
  requestErroEmptyStr: { content: "" },
  requestErroMin: { content: "a" },
  requestErroMax: { content: "a".repeat(51) },
  requestErroNotStr: { content: 1 },
  response: { id: '0f7446c3-43a1-4e49-b3ce-443bc3b81d2f', content: 'Refazendo o ultimo requisito' },
  responseErrorNotFound: { data: { message: { error: 'Task Not Found' } } },
  responseErroEmptyStr: { message: '\"Content\" fild not be empty' },
  responseErroNotStr: {	message: '\"Content\" must be a string'  },
  responseErroMin: { message: '\"content\" length must be at least 2 characters long' },
  responseErroMax: { message: '\"content\" length must be less than or equal to 50 characters long' },
  responseErroNoField: {	message: 'All fields must be filled' },
}

export const updatedStatus = {
  response: { id: '0f7446c3-43a1-4e49-b3ce-443bc3b81d2f', status: 'PEDDING' },
  responseErrorStatus: { message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' },
  responseErrorNotFound: { message: { error: 'Task Not Found' } },
  responseErroEmptyStr: { message: '\"Status\" fild not be empty' },
  responseErroNotStr: {	message: '\"Status\" must be a string'  },
  responseErroNoField: {	message: 'All fields must be filled' },
  request: { status: 'PEDDING' },
  requestErroEmptyStr: { status: "" },
  requestErrorStatus: { status: 'FINISHED' },
  requestErroNotStr: { status: 1 },
};

export const createTask = {
  request: { content: 'Terminar o projeto de ontem', status: 'IN_PROGRESS' },

  requestErroEmptyStrStatus: { content: 'Terminar o projeto de ontem', status: "" },
  requestErrorStatus: { content: 'Terminar o projeto de ontem', status: 'FINISHED' },
  requestErroNotStrStatus: { content: 'Terminar o projeto de ontem', status: 1 },
  requestErroEmptyStrContent: { content: "", status: 'IN_PROGRESS' },
  requestErroMinContent: { content: "a", status: 'IN_PROGRESS' },
  requestErroMaxContent: { content: "a".repeat(51), status: 'IN_PROGRESS' },
  requestErroNotStrContent: { content: 1, status: 'IN_PROGRESS' },

  response: { content: 'Terminar o projeto de ontem', status: 'IN_PROGRESS' },

  responseErrorStatus: { message: 'Status must be exactly IN_PROGRESS | DONE | PEDDING' },
  responseErroEmptyStrStatus: { message: '\"Status\" fild not be empty' },
  responseErroNotStrStatus: {	message: '\"Status\" must be a string'  },

  responseErroNoField: {	message: 'All fields must be filled' },

  responseErroEmptyStrContent: { message: '\"Content\" fild not be empty' },
  responseErroNotStrContent: {	message: '\"Content\" must be a string'  },
  responseErroMinContent: { message: '\"content\" length must be at least 2 characters long' },
  responseErroMaxContent: { message: '\"content\" length must be less than or equal to 50 characters long' },
}
