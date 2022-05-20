import joi from 'joi';

export default class TaskSchema {
  private joi: joi.Root;

  constructor(validator: joi.Root) {
    this.joi = validator;
  }

  public createTask() {
    return this.joi.object({
      content: this.joi.string().required().min(2).max(50)
        .messages({
          'any.required': '400|All fields must be filled',
          'string.empty': '400|"Content" fild not be empty',
          'string.base': '400|"Content" must be a string',
        }),
      status: this.joi.string().required().messages({
        'any.required': '400|All fields must be filled',
        'string.empty': '400|"Status" fild not be empty',
        'string.base': '400|"Status" must be a string',
      }),
    });
  }

  public updateContent() {
    return this.joi.object({
      content: this.joi.string().required().min(2).max(50)
        .messages({
          'any.required': '400|All fields must be filled',
          'string.empty': '400|"Content" fild not be empty',
          'string.base': '400|"Content" must be a string',
        }),
    });
  }

  public updateStatus() {
    return this.joi.object({
      status: this.joi.string().required().messages({
        'any.required': '400|All fields must be filled',
        'string.empty': '400|"Status" fild not be empty',
        'string.base': '400|"Status" must be a string',
      }),
    });
  }
}
