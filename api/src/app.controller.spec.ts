import { AppController } from './app.controller.js';

describe('AppController', () => {
  it('should return "Hello World!"', () => {
    const appService = {
      getHello: () => 'Hello World!',
    };

    const appController = new AppController(appService);

    expect(appController.getHello()).toBe('Hello World!');
  });
});