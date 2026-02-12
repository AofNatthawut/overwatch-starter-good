import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
  @ApiProperty({
    description: 'รายละเอียดเหตุการณ์',
    example: 'เกิดเหตุไฟไหม้ที่ตึกพารากอน',
  })
  text: string;

  @ApiProperty({ description: 'ประเภทของเหตุการณ์', example: 'FIRE' })
  type: string;

  @ApiProperty({ description: 'ระดับความสำคัญ', example: 'HIGH', required: false })
  priority?: string;

  @ApiProperty({ example: 13.7563, required: false })
  latitude?: number;

  @ApiProperty({ example: 100.5018, required: false })
  longitude?: number;
}
