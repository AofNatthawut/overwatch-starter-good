# 📅 DAY 1: THE GENESIS (การกำเนิด)

---

## 🌅 MISSION 1: THE FIRST BREATH
**Concept:** สร้าง REST API Backbone และระบบเอกสาร (Swagger) เพื่อใช้ควบคุมระบบ.

### 📝 PROTOCOL (Copy & Paste to AI Chat)
```text
Ultron, เริ่มต้นภารกิจที่ 1: "API Backbone Construction"

1. **Install Libraries**: ติดตั้ง `@nestjs/swagger` และ `swagger-ui-express`.
2. **Configure Swagger**: แก้ไข `main.ts` เพื่อตั้งค่า Swagger Document ที่ Path `/api`.
   - Title: 'Overwatch API'
   - Description: 'The Sovereign AI Defense System API'
3. **Generate Resource**: สร้าง REST Resource ชื่อ `incidents` (ประกอบด้วย Module, Controller, Service, Entity).
4. **Health Check**: สร้าง Endpoint `GET /status` ที่คืนค่า JSON: `{ "system": "ULTRON", "status": "ONLINE" }`.

Concept Code: ใช้ NestJS Standard Structure.
ปฏิบัติการ.
```

### ✅ VERIFY
1. เปิด Browser ไปที่ `http://localhost:3000/api`
2. ต้องเห็นหน้า **Swagger UI** สีเขียว และมี `Incidents` API โผล่ขึ้นมา.
3. ลอง GET `/status` ต้องได้สถานะ ONLINE.

---

## 🌤️ MISSION 2: THE INFRASTRUCTURE
**Concept:** สร้างฐานข้อมูล SQLite เพื่อเป็น "หน่วยความจำระยะยาว" ให้กับระบบ.

### 📝 PROTOCOL (Copy & Paste to AI Chat)
```text
Ultron, เริ่มต้นภารกิจที่ 2: "Database Core"

1. **Install Drivers**: ติดตั้ง `sqlite3` และ `typeorm` `@nestjs/typeorm`.
2. **Setup DB Connection**: แก้ไข `AppModule` ให้เชื่อมต่อ SQLite ฐานข้อมูลชื่อ `database.sqlite`.
   - ตั้งค่า `autoLoadEntities: true` และ `synchronize: true` (สำหรับ Dev Mode).
3. **Design Entity**: แก้ไขไฟล์ `src/incidents/entities/incident.entity.ts`.
   - กำหนด Columns: 
     - `id`: UUID (Primary Key)
     - `text`: String
     - `type`: String (Ex: FIRE, FLOOD)
     - `priority`: String (Ex: HIGH, LOW)
     - `createdAt`: DateStamp

วิเคราะห์และลงมือทำ.
```

### ✅ VERIFY
1. สังเกตไฟล์ `database.sqlite` ในโครงการ.
2. รีเฟรช Swagger (`/api`) แล้วดูที่ **Schemas** ด้านล่างสุด ต้องเห็นโครงสร้าง `Incident` ครบตามที่สั่ง.

---

## 🧠 MISSION 3: THE VIRTUAL BRAIN
**Concept:** สร้าง Logic พื้นฐานในการ "คัดกรอง" ความรุนแรงของเหตุการณ์.

### 📝 PROTOCOL (Copy & Paste to AI Chat)
```text
Ultron, เริ่มต้นภารกิจที่ 3: "Intelligence Logic"

ไปที่ `src/incidents/incidents.service.ts` และเพิ่ม Method ใหม่:
`analyzeThreat(text: string): { type: string, priority: string }`

**Logic Requirements:**
- ถ้า text มีคำว่า: "ไฟ", "ระเบิด", "ชน", "ตาย" -> ให้ Type="ACCIDENT" และ Priority="HIGH".
- ถ้า text มีคำว่า: "รถติด", "น้ำท่วม" -> ให้ Type="GENERAL" และ Priority="LOW".
- Default: Type="UNCLEAR", Priority="LOW".

Implement Logic นี้โดยไม่ต้องต่อ API ภายนอก.
```

### ✅ VERIFY
ให้ AI อธิบาย Code ที่เขียนมาว่า Logic การเช็คคำ (Keyword Matching) อยู่ตรงไหน.

---

## 🔗 MISSION 4: THE CONNECTION
**Concept:** เชื่อมต่อ "สมอง" (Service Logic) เข้ากับ "ระบบรับข้อมูล" (Controller).

### 📝 PROTOCOL (Copy & Paste to AI Chat)
```text
Ultron, เริ่มต้นภารกิจที่ 4: "Neural Link Integration"

ทำการเชื่อมต่อระบบ:
1. **Refactor Controller**: ที่ `POST /incidents` ให้รับ Body แค่ `{ "text": string }` (ใช้ DTO).
2. **Integration Flow**:
   - เมื่อ Controller รับ `text` เข้ามา -> ส่งไปให้ `analyzeThreat()` ใน Service.
   - เอาผลลัพธ์ (Type, Priority) ไปรวมกับ Text -> สั่ง `repository.save()` ลง Database.
3. **Return**: คืนค่า Incident object ที่บันทึกเสร็จแล้วกลับไป.

ลงมือเชื่อมต่อ.
```

### ✅ VERIFY
1. ไปที่ Swagger (`/api`) -> **POST /incidents**
2. ลองใส่ JSON: `{ "text": "เกิดระเบิดที่สยามพารากอน" }`
3. Response ต้องได้ `priority: "HIGH"` กลับมาอัตโนมัติ! (ถือว่า AI คิดเองเป็นแล้ว)

---

**จบภารกิจวันที่ 1: ระบบ Overwatch มีสมองและรอยหยักแล้ว!**
ไปต่อที่ `_handbook/02-day2-evolution.md`