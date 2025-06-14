import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { StudentScoreService } from './student-score.service';

@Controller('student-score')
export class StudentScoreController {
  constructor(private readonly studentScoreService: StudentScoreService) {}

  @Get('report/:subject')
  getLevelReport(@Param('subject') subject: string) {
    return this.studentScoreService.getScoreLevelReport(subject);
  }

  @Get('/statistics')
  getAllStatistics() {
    return this.studentScoreService.getAllSubjectStatistics();
  }

  @Get('top/group-a')
  getTopGroupA() {
    return this.studentScoreService.getTopGroupAStudents();
  }

  @Get(':sbd')
  getStudentScore(@Param('sbd') sbd: string) {
    if (!/^[0-9]{8}$/.test(sbd)) {
      throw new BadRequestException('Invalid Registration Number format. Must be 8 digits.');
    }
    return this.studentScoreService.getStudentScoreBySbd(sbd);
  }
}
