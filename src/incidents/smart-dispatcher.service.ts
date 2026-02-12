import { Injectable } from '@nestjs/common';

export interface Patient {
    id: string;
    status: 'CRITICAL' | 'STABLE' | 'GENERAL';
    latitude: number;
    longitude: number;
}

export interface Hospital {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    availableBeds: number;
    specialty: string[];
}

@Injectable()
export class SmartDispatcher {
    /**
     * คำนวณหาโรงพยาบาลที่ดีที่สุดสำหรับผู้ป่วย
     * หลักการ: สำหรับเคสวิกฤต (CRITICAL) ความพร้อมของเตียง (Capacity) สำคัญกว่าระยะทาง (Distance)
     */
    findBestHospital(patient: Patient, hospitals: Hospital[]): Hospital | null {
        if (hospitals.length === 0) return null;

        // สำหรับผู้ป่วยวิกฤต
        if (patient.status === 'CRITICAL') {
            // 1. กรองเฉพาะโรงพยาบาลที่มีเตียงว่างจริงๆ เท่านั้น
            const availableHospitals = hospitals.filter(h => h.availableBeds > 0);

            if (availableHospitals.length === 0) {
                // กรณีเลวร้ายที่สุด: ไม่มีโรงพยาบาลไหนว่างเลย
                // ในสถานการณ์จริงอาจต้องประสานงานศูนย์ส่งต่อระดับสูง
                return null;
            }

            // 2. เลือกโรงพยาบาลที่ใกล้ที่สุด 'จากกลุ่มที่พร้อมรับ'
            return availableHospitals.reduce((best, current) => {
                const distToBest = this.calculateDistance(patient, best);
                const distToCurrent = this.calculateDistance(patient, current);
                return distToCurrent < distToBest ? current : best;
            });
        }

        // สำหรับเคสทั่วไป (STABLE/GENERAL)
        // เน้นความสะดวกและระยะทางเป็นหลัก
        return hospitals.reduce((best, current) => {
            const distToBest = this.calculateDistance(patient, best);
            const distToCurrent = this.calculateDistance(patient, current);
            return distToCurrent < distToBest ? current : best;
        });
    }

    private calculateDistance(p: { latitude: number; longitude: number }, h: { latitude: number; longitude: number }): number {
        // Haversine formula (Simplified for small distances)
        const dy = p.latitude - h.latitude;
        const dx = p.longitude - h.longitude;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
