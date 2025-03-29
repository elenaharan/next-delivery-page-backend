import { Controller, Get, Param } from '@nestjs/common';
import * as users from '../data/data.json';

@Controller('comms')
export class CommsController {
  @Get('your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string) {
    const pouchPrices = {
      A: 55.5,
      B: 59.5,
      C: 62.75,
      D: 66.0,
      E: 69.0,
      F: 71.25,
    };

    const user = (users as any[]).find((u) => u.id === userId);
    if (!user) return { error: 'User not found' };

    const activeCats = user.cats.filter((cat: any) => cat.subscriptionActive);
    const catNames = activeCats.map((cat: any) => cat.name);
    const totalPrice = activeCats.reduce(
      (sum: number, cat: any) =>
        sum + pouchPrices[cat.pouchSize as keyof typeof pouchPrices],
      0,
    );

    const nameList =
      catNames.length === 1
        ? catNames[0]
        : catNames.length === 2
          ? `${catNames[0]} and ${catNames[1]}`
          : `${catNames.slice(0, -1).join(', ')} and ${catNames[catNames.length - 1]}`;

    return {
      title: `Your next delivery for ${nameList}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${nameList}'s fresh food.`,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      freeGift: totalPrice > 120,
    };
  }
}
