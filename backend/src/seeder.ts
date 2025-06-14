import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import { DataSource } from 'typeorm';
import { StudentScore } from './student-score/student-score.entity';
import 'dotenv/config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [StudentScore],
  synchronize: true,
});

async function runSeeder() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(StudentScore);

  const results: StudentScore[] = [];

  fs.createReadStream(
    path.join(__dirname, '..', '..', 'diem_thi_thpt_2024.csv'),
  )
    .pipe(csv())
    .on('data', (data) => {
      results.push({
        sbd: data.sbd,
        toan: parseFloat(data.toan) || null,
        ngu_van: parseFloat(data.ngu_van) || null,
        ngoai_ngu: parseFloat(data.ngoai_ngu) || null,
        vat_li: parseFloat(data.vat_li) || null,
        hoa_hoc: parseFloat(data.hoa_hoc) || null,
        sinh_hoc: parseFloat(data.sinh_hoc) || null,
        lich_su: parseFloat(data.lich_su) || null,
        dia_li: parseFloat(data.dia_li) || null,
        gdcd: parseFloat(data.gdcd) || null,
        ma_ngoai_ngu: data.ma_ngoai_ngu || null,
      });
    })
    .on('end', async () => {
      const chunkSize = 500;
      for (let i = 0; i < results.length; i += chunkSize) {
        const chunk = results.slice(i, i + chunkSize);
        await repo.save(chunk);
        console.log(`Seeded ${i + chunk.length}/${results.length}`);
      }
      console.log(`Done seeding ${results.length} records`);
      await AppDataSource.destroy();
    });
}

runSeeder();
