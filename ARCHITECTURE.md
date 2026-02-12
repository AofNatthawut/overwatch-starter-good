# Overwatch System Architecture

ระบบ Overwatch ถูกออกแบบมาเพื่อการตรวจจับและวิเคราะห์เหตุการณ์แบบจุดต่อจุด (Endpoint-to-Endpoint) โดยเน้นความเร็วระดับวินาที (Low Latency) และความแม่นยำทางภูมิศาสตร์

## 🏗️ System Components

```mermaid
graph TD
    subgraph "External Control"
        SIM["Simulation (simulation.js)"]
    end

    subgraph "Overwatch Backend (NestJS)"
        CONTROLLER["IncidentsController (API)"]
        SERVICE["IncidentsService (Intelligence)"]
        GATEWAY["EventsGateway (WebSocket)"]
        DB[(SQLite / TypeORM)]
    end

    subgraph "Visual Intelligence (Frontend)"
        DASHBOARD["Dashboard (index.html)"]
        MAP["Leaflet Map (BKK Focus)"]
        FEED["Incident Feed (Sidebar)"]
    end

    %% Data Flow
    SIM -- "1. POST /incidents (JSON)" --> CONTROLLER
    CONTROLLER -- "2. Pass DTO" --> SERVICE
    SERVICE -- "3. Analyze & Persist" --> DB
    SERVICE -- "4. Trigger Broadcast" --> GATEWAY
    GATEWAY -- "5. Emit: new_incident_alert (WS)" --o DASHBOARD
    DASHBOARD -- "6. Project Marker" --> MAP
    DASHBOARD -- "7. Update Stream" --> FEED
    
    %% Style
    style SIM fill:#f96,stroke:#333,stroke-width:2px
    style DASHBOARD fill:#00f3ff,stroke:#333,stroke-width:2px,color:#000
    style SERVICE fill:#ff4136,stroke:#333,stroke-width:2px
```

## 📡 Data Flow Description (ภาษาไทย)

1.  **Simulation Flow**: ไฟล์ `simulation.js` ทำหน้าที่เป็นจุดกำเนิดข้อมูล โดยการส่งข้อมูลเหตุการณ์จำลองพร้อมพิกัดจริง (Lat/Long) ผ่านทาง HTTP POST ไปยัง API Endpoint ของระบบ
2.  **API Handling**: `IncidentsController` รับข้อมูล (DTO) และส่งต่อไปยัง `IncidentsService` ซึ่งเป็นสมองกลของระบบ
3.  **Intelligence Processing**: `IncidentsService` ทำการวิเคราะห์ Keyword เพื่อกำหนดระดับความรุนแรงและประเภทของเหตุการณ์ จากนั้นบันทึกลงฐานข้อมูล SQLite เพื่อเก็บเป็นประวัติ (Persistence)
4.  **Real-time Broadcast**: เมื่อวิเคราะห์เสร็จสิ้น Service จะสั่งให้ `EventsGateway` ทำการกระจายข้อมูลเหตุการณ์นั้นๆ ออกไปทางท่อสื่อสาร WebSocket (Port 3001) ทันที
5.  **Tactical Visualization**: หน้า Dashboard รับข้อมูลผ่าน Socket.io และนำพิกัดพุ่งไปปักหมุดบนแผนที่ของกรุงเทพฯ พร้อมอัปเดตรายการใน Sidebar แบบวินาทีต่อวินาทีโดยไม่ต้องรีเฟรชหน้าจอ

---
> **PROJECT STATUS**: OPERATIONAL | **PROTOCOL**: GENESIS
