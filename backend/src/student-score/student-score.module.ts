import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentScore } from './student-score.entity';
import { StudentScoreService } from './student-score.service';
import { StudentScoreController } from './student-score.controller';
import { RedisModule } from 'src/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentScore]),RedisModule],
  controllers: [StudentScoreController],
  providers: [StudentScoreService],
})
export class StudentScoreModule {}