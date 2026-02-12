import { SmartDispatcher, Patient, Hospital } from './smart-dispatcher.service';

const dispatcher = new SmartDispatcher();

const patient: Patient = {
    id: 'P01',
    status: 'CRITICAL',
    latitude: 13.75, // BKK Center
    longitude: 100.5,
};

const hospitals: Hospital[] = [
    {
        id: 'H_NEAR_FULL',
        name: 'โรงพยาบาล A (ใกล้ - เต็ม)',
        latitude: 13.76, // 1km approx
        longitude: 100.51,
        availableBeds: 0,
        specialty: ['ER'],
    },
    {
        id: 'H_FAR_AVAIL',
        name: 'โรงพยาบาล B (ไกล - ว่าง)',
        latitude: 13.80, // 5km approx
        longitude: 100.55,
        availableBeds: 5,
        specialty: ['ICU', 'Trauma'],
    },
];

console.log('--- ⚖️ DLC 3: SMART DISPATCHER TEST ---');
console.log(`สถานะผู้ป่วย: ${patient.status}`);
const best = dispatcher.findBestHospital(patient, hospitals);

if (best && best.id === 'H_FAR_AVAIL') {
    console.log('✅ TEST PASSED: เลือก รพ. B (ว่าง) แม้จะไกลกว่า');
    console.log(`เหตุผล: สำหรับเคสวิกฤต ความพร้อม (Capacity) สำคัญกว่าระยะทาง`);
} else {
    console.log('❌ TEST FAILED');
}
console.log(`Result: ${best?.name}`);
