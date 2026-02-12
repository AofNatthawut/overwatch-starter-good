import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Incident } from './entities/incident.entity';
import { EventsGateway } from './events.gateway';
import { SmartDispatcher, Hospital } from './smart-dispatcher.service';

@Injectable()
export class IncidentsService {
  private readonly mockHospitals: Hospital[] = [
    { id: 'H1', name: 'รพ. กรุงเทพ (Asoke)', latitude: 13.748, longitude: 100.584, availableBeds: 2, specialty: ['Trauma'] },
    { id: 'H2', name: 'รพ. พระราม 9', latitude: 13.753, longitude: 100.570, availableBeds: 0, specialty: ['ER'] },
    { id: 'H3', name: 'รพ. รามาธิบดี', latitude: 13.766, longitude: 100.527, availableBeds: 10, specialty: ['General'] },
  ];

  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly eventsGateway: EventsGateway,
    private smartDispatcher: SmartDispatcher,
  ) { }

  analyzeThreat(text: string): { type: string; priority: string } {
    const highPriorityKeywords = [
      'ไฟ',
      'ระเบิด',
      'อุบัติเหตุ',
      'ปืน',
      'ก่อการร้าย',
    ];
    const lowerText = text.toLowerCase();

    const isHigh = highPriorityKeywords.some((kw) => lowerText.includes(kw));

    if (lowerText.includes('ไฟ'))
      return { type: 'FIRE', priority: isHigh ? 'HIGH' : 'LOW' };
    if (lowerText.includes('ระเบิด'))
      return { type: 'BOMB', priority: isHigh ? 'HIGH' : 'LOW' };
    if (lowerText.includes('อุบัติเหตุ'))
      return { type: 'ACCIDENT', priority: isHigh ? 'HIGH' : 'LOW' };

    return {
      type: 'GENERAL',
      priority: isHigh ? 'HIGH' : 'LOW',
    };
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const analysis = this.analyzeThreat(createIncidentDto.text);

    // Agent Intelligence: Smart Medical Dispatch
    let recommendedHospital = 'Pending Analysis';
    let hospitalReasoning = 'Awaiting real-time facility data...';

    if (createIncidentDto.latitude && createIncidentDto.longitude) {
      const best = this.smartDispatcher.findBestHospital(
        {
          id: 'TEMP',
          status: analysis.priority === 'HIGH' ? 'CRITICAL' : 'STABLE',
          latitude: createIncidentDto.latitude,
          longitude: createIncidentDto.longitude
        },
        this.mockHospitals
      );

      if (best) {
        recommendedHospital = best.name;
        hospitalReasoning = analysis.priority === 'HIGH'
          ? `[Agent Reasoning] เคสวิกฤต: เลือก ${best.name} เพราะมีเตียงว่าง (${best.availableBeds}) แม้อาจจะไม่ใช่จุดที่ใกล้ที่สุด เพื่อเลี่ยงภาวะคอขวดครับ`
          : `[Agent Reasoning] เคสปกติ: เลือก ${best.name} เนื่องจากเป็นจุดที่ใกล้ที่สุดและมีความพร้อมครับ`;
      }
    }

    const incident = this.incidentRepository.create({
      ...createIncidentDto,
      type: analysis.type,
      priority: createIncidentDto.priority || analysis.priority,
      recommendedHospital,
      hospitalReasoning,
    });

    const result = await this.incidentRepository.save(incident);
    this.eventsGateway.emitNewIncident(result);
    return result;
  }

  async findAll(): Promise<Incident[]> {
    return this.incidentRepository.find({
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async findOne(id: string): Promise<Incident> {
    const incident = await this.incidentRepository.findOneBy({ id });
    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }
    return incident;
  }

  async update(
    id: string,
    updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    const incident = await this.findOne(id);

    // Re-analyze if text is updated
    if (updateIncidentDto.text) {
      const analysis = this.analyzeThreat(updateIncidentDto.text);
      updateIncidentDto['type'] = analysis.type;
      updateIncidentDto['priority'] = analysis.priority;
    }

    Object.assign(incident, updateIncidentDto);
    return await this.incidentRepository.save(incident);
  }

  async remove(id: string): Promise<void> {
    const incident = await this.findOne(id);
    await this.incidentRepository.remove(incident);
  }
}
