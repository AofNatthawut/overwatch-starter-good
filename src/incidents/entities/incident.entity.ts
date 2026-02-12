import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Incident {
  @ApiProperty({ description: 'รหัสลับของเหตุการณ์ (UUID)' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'รายละเอียดเหตุการณ์' })
  @Column()
  text: string;

  @ApiProperty({ description: 'ประเภทเหตุการณ์' })
  @Column()
  type: string;

  @ApiProperty({ description: 'ระดับความสำคัญ' })
  @Column({ default: 'LOW' })
  priority: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ nullable: true })
  recommendedHospital: string;

  @Column({ type: 'text', nullable: true })
  hospitalReasoning: string;

  @ApiProperty({ description: 'เวลาที่เกิดเหตุ' })
  @CreateDateColumn()
  createdAt: Date;
}
