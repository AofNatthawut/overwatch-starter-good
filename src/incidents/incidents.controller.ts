import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';

import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Incident } from './entities/incident.entity';

@ApiTags('incidents')
@Controller('incidents')
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) { }

  @Post()
  @ApiOperation({ summary: 'สร้างเหตุการณ์ใหม่ (Create Incident)' })
  @ApiBody({ type: CreateIncidentDto })
  @ApiResponse({ status: 201, description: 'สร้างสำเร็จ', type: Incident })
  create(@Body() createIncidentDto: CreateIncidentDto) {
    return this.incidentsService.create(createIncidentDto);
  }

  @Get()
  @ApiOperation({ summary: 'เรียกดูประวัติเหตุการณ์ทั้งหมด (History Fetch)' })
  @ApiResponse({ status: 200, description: 'รายชื่อเหตุการณ์ล่าสุด 50 รายการ', type: [Incident] })
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incidentsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return await this.incidentsService.update(id, updateIncidentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.incidentsService.remove(id);
  }
}
