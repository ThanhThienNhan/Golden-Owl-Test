import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentScore } from './student-score.entity';
import Redis from 'ioredis';

@Injectable()
export class StudentScoreService {
  constructor(
    @InjectRepository(StudentScore)
    private readonly studentScoreRepo: Repository<StudentScore>,

    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  async getStudentScoreBySbd(sbd: string): Promise<StudentScore | null> {
    return this.studentScoreRepo.findOneBy({ sbd });
  }

  async getScoreLevelReport(subject: string) {
    const cacheKey = `score-level-${subject}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const qb = this.studentScoreRepo.createQueryBuilder('score');
    const result = {
      '>=8': await qb.where(`score.${subject} >= 8`).getCount(),
      '6-8': await qb.where(`score.${subject} >= 6 AND score.${subject} < 8`).getCount(),
      '4-6': await qb.where(`score.${subject} >= 4 AND score.${subject} < 6`).getCount(),
      '<4': await qb.where(`score.${subject} < 4`).getCount(),
    };

    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    return result;
  }

  async getAllSubjectStatistics() {
    const cacheKey = 'all-subject-statistics';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const subjects = [
      'toan', 'ngu_van', 'ngoai_ngu',
      'vat_li', 'hoa_hoc', 'sinh_hoc',
      'lich_su', 'dia_li', 'gdcd',
    ];

    const result = {};
    for (const subject of subjects) {
      result[subject] = await this.getScoreLevelReport(subject);
    }

    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    return result;
  }

  async getTopGroupAStudents() {
    const cacheKey = 'top-group-a';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const result = await this.studentScoreRepo
      .createQueryBuilder('score')
      .addSelect('COALESCE(score.toan, 0) + COALESCE(score.vat_li, 0) + COALESCE(score.hoa_hoc, 0)', 'total')
      .orderBy('total', 'DESC')
      .limit(10)
      .getMany();

    await this.redis.set(cacheKey, JSON.stringify(result), 'EX', 300);
    return result;
  }
}
