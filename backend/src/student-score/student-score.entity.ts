import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentScore {
  @PrimaryColumn()
  sbd: string;

  @Column({ type: 'float', nullable: true })
  toan: number | null;

  @Column({ type: 'float', nullable: true })
  ngu_van: number | null;

  @Column({ type: 'float', nullable: true })
  ngoai_ngu: number | null;

  @Column({ type: 'float', nullable: true })
  vat_li: number | null;

  @Column({ type: 'float', nullable: true })
  hoa_hoc: number | null;

  @Column({ type: 'float', nullable: true })
  sinh_hoc: number | null;

  @Column({ type: 'float', nullable: true })
  lich_su: number | null;

  @Column({ type: 'float', nullable: true })
  dia_li: number | null;

  @Column({ type: 'float', nullable: true })
  gdcd: number | null;

  @Column({ type: 'text', nullable: true })
  ma_ngoai_ngu: string | null;
}
