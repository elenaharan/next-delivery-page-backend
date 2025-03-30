import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';

jest.mock('./data/data.json', () => [
  {
    id: 'user1',
    firstName: 'John',
    cats: [
      { name: 'Vaska', subscriptionActive: true, pouchSize: 'A' },
      { name: 'Bob', subscriptionActive: true, pouchSize: 'B' },
    ],
  },
  {
    id: 'user2',
    firstName: 'Jennie',
    cats: [
      { name: 'Snowie', subscriptionActive: false, pouchSize: 'C' },
      { name: 'Fluffy', subscriptionActive: true, pouchSize: 'F' },
      { name: 'Cookie', subscriptionActive: true, pouchSize: 'E' },
    ],
  },
]);

describe('CommsController', () => {
  let controller: CommsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
    }).compile();

    controller = module.get<CommsController>(CommsController);
  });

  it('should return error if user not found', () => {
    const result = controller.getNextDelivery('user12345');
    expect(result).toEqual({ error: 'User not found' });
  });

  it('should handle user with 2 active cats and return totalPrice, message, and freeGift false', () => {
    const result = controller.getNextDelivery('user1');
    expect(result).toEqual({
      title: 'Your next delivery for Vaska and Bob',
      message:
        "Hey John! In two days' time, we'll be charging you for your next order for Vaska and Bob's fresh food.",
      totalPrice: 115,
      freeGift: false,
    });
  });

  it('should handle user with 2 active cats and return freeGift true when totalPrice > 120', () => {
    const result = controller.getNextDelivery('user2');
    const expectedTotal = 140.25;
    expect(result).toEqual({
      title: 'Your next delivery for Fluffy and Cookie',
      message:
        "Hey Jennie! In two days' time, we'll be charging you for your next order for Fluffy and Cookie's fresh food.",
      totalPrice: parseFloat(expectedTotal.toFixed(2)),
      freeGift: true,
    });
  });
});
