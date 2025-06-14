import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentScore } from './student-score.entity';

@Injectable()
export class StudentScoreService {
  constructor(
    @InjectRepository(StudentScore)
    private readonly studentScoreRepo: Repository<StudentScore>,
  ) {}

  async getStudentScoreBySbd(sbd: string): Promise<StudentScore | null> {
    return this.studentScoreRepo.findOneBy({ sbd });
  }

  async getScoreLevelReport(subject: string) {
    const qb = this.studentScoreRepo.createQueryBuilder('score');
    return {
      '>=8': await qb.where(`score.${subject} >= 8`).getCount(),
      '6-8': await qb.where(`score.${subject} >= 6 AND score.${subject} < 8`).getCount(),
      '4-6': await qb.where(`score.${subject} >= 4 AND score.${subject} < 6`).getCount(),
      '<4': await qb.where(`score.${subject} < 4`).getCount(),
    };
  }

  async getAllSubjectStatistics() {
    const subjects = [
      'toan', 'ngu_van', 'ngoai_ngu',
      'vat_li', 'hoa_hoc', 'sinh_hoc',
      'lich_su', 'dia_li', 'gdcd',
    ];

    const result = {};
    for (const subject of subjects) {
      result[subject] = await this.getScoreLevelReport(subject);
    }
    return result;
  }

  async getTopGroupAStudents() {
    return this.studentScoreRepo
      .createQueryBuilder('score')
      .addSelect('COALESCE(score.toan, 0) + COALESCE(score.vat_li, 0) + COALESCE(score.hoa_hoc, 0)', 'total')
      .orderBy('total', 'DESC')
      .limit(10)
      .getMany();
  }
}
