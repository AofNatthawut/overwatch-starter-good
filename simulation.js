const axios = require('axios');

const API_URL = 'http://localhost:3000/incidents';

// Intelligence Data: Real Bangkok Hotspots (2024-2025)
const BKK_HOTSPOTS = [
    {
        name: 'แยกอโศก-เพชรบุรี',
        text: '⚠️ รายงานการจราจรติดขัดรุนแรงและอุบัติเหตุเฉลี่ยวที่แยกอโศก-เพชรบุรี',
        lat: 13.7480,
        lng: 100.5647
    },
    {
        name: 'ห้าแยกลาดพร้าว',
        text: '🚗 ห้าแยกลาดพร้าว: ปริมาณรถหนาแน่นสะสม มีอุบัติเหตุรถเฉี่ยวชนบริเวณทางเบี่ยง',
        lat: 13.8166,
        lng: 100.5630
    },
    {
        name: 'แยกพระราม 9',
        text: '🚨 แยกพระราม 9: พบอุบัติเหตุรถจักรยานยนต์ล้มคว่ำ กีดขวางการจราจร 2 ช่องทาง',
        lat: 13.7600,
        lng: 100.5847
    },
    {
        name: 'สาทร-วิทยุ',
        text: '💼 ย่านธุรกิจสาทร: รถติดขัดขัดตัวรุนแรงแยกสาทร-สุรศักดิ์ ระบบตรวจพบการขับรถย้อนศร',
        lat: 13.7208,
        lng: 100.5186
    },
    {
        name: 'แยกประตูน้ำ',
        text: '🛍️ แยกประตูน้ำ: ระบบเฝ้าระวังตรวจพบกลุ่มควันและเหตุทะเลาะวิวาทใกล้แหล่งชุมชน',
        lat: 13.7547,
        lng: 100.5392
    }
];

let currentIndex = 0;

async function triggerIncident() {
    const hotspot = BKK_HOTSPOTS[currentIndex];

    console.log(`\n[${new Date().toLocaleTimeString()}] 📡 AGENT ACTION: Triggering Crisis Scenario`);
    console.log(`[TARGET] ${hotspot.name} (${hotspot.lat}, ${hotspot.lng})`);
    console.log(`[TEXT] "${hotspot.text}"`);

    try {
        const response = await axios.post(API_URL, {
            text: hotspot.text,
            latitude: hotspot.lat,
            longitude: hotspot.lng
        });

        console.log(`[SUCCESS] Ultron Processed Case: ${response.data.id}`);
        console.log(`[DISPATCH] Recommended: ${response.data.recommendedHospital}`);
    } catch (error) {
        console.error(`[ERROR] Tactical Link Failed: ${error.message}`);
    }

    currentIndex = (currentIndex + 1) % BKK_HOTSPOTS.length;
}

console.log('--- 🚀 ULTRON SCENARIO ENGINE STARTED ---');
console.log('--- LOOPING BANGKOK HOTSPOTS EVERY 10 SECONDS ---');

// Run immediately then loop
triggerIncident();
setInterval(triggerIncident, 10000);
