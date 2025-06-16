import { Module } from '@nestjs/common';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redisUrl = process.env.REDIS_URL!;
        return new Redis(redisUrl);
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}