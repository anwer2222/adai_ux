export type Lang = "ar" | "en";

export type UserRole = "ahmed" | "khaled" | "mohammed";

export type ZoneId =
  | "warehouse"
  | "ops_ahmed"
  | "ops_khaled"
  | "server_core"
  | "approval_chamber"
  | "order_intake";

export type KnowledgeStatus = "draft" | "pending_approval" | "approved";

export type TransferStatus =
  | "not_started"
  | "assigned"
  | "test_passed"
  | "verified";

export interface KnowledgeCard {
  id: string;
  titleAr: string;
  titleEn: string;
  ownerId: UserRole;
  ownerNameAr: string;
  ownerNameEn: string;
  departmentAr: string;
  departmentEn: string;
  processAr: string;
  processEn: string;
  typeAr: string;
  typeEn: string;
  criticality: "critical" | "high" | "medium";
  causeAr: string;
  causeEn: string;
  solutionAr: string;
  solutionEn: string;
  stepsAr: string[];
  stepsEn: string[];
  exceptionAr: string;
  exceptionEn: string;
  lessonAr: string;
  lessonEn: string;
  status: KnowledgeStatus;
  version: string;
  approverAr?: string;
  approverEn?: string;
  approvedAt?: string;
  qualifiedEmployeesAr: string[];
  qualifiedEmployeesEn: string[];
  usageCount: number;
  zoneId: ZoneId;
  keywords: string[];
}

export interface HistoricalCase {
  id: string;
  monthAr: string;
  monthEn: string;
  reasonKey: "reserved_stock" | "credit_approval" | "order_data_error";
  reasonAr: string;
  reasonEn: string;
  orderValueSar: number;
}

export interface Initiative {
  id: string;
  titleAr: string;
  titleEn: string;
  ownersAr: string;
  ownersEn: string;
  status: "active" | "completed";
  createdAt: string;
}

export interface DemoState {
  knowledgeCards: KnowledgeCard[];
  transferStatus: TransferStatus;
  orderSO10482Resolved: boolean;
  initiatives: Initiative[];
  auditLog: {
    id: string;
    timestamp: string;
    actorAr: string;
    actorEn: string;
    actionAr: string;
    actionEn: string;
  }[];
}

export interface Persona {
  id: UserRole;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  expAr: string;
  expEn: string;
  isManager: boolean;
  avatarBg: string;
  initials: string;
  zoneId: ZoneId;
}

export const PERSONAS: Record<UserRole, Persona> = {
  ahmed: {
    id: "ahmed",
    nameAr: "أحمد القحطاني",
    nameEn: "Ahmed Al-Qahtani",
    roleAr: "أخصائي عمليات أول",
    roleEn: "Senior Operations Specialist",
    expAr: "خبرة 12 سنة",
    expEn: "12 yrs exp",
    isManager: false,
    avatarBg: "bg-amber-500",
    initials: "AQ",
    zoneId: "ops_ahmed",
  },
  khaled: {
    id: "khaled",
    nameAr: "خالد الغامدي",
    nameEn: "Khaled Al-Ghamdi",
    roleAr: "أخصائي عمليات جديد",
    roleEn: "New Operations Specialist",
    expAr: "خبرة 3 أشهر",
    expEn: "3 mos exp",
    isManager: false,
    avatarBg: "bg-sky-500",
    initials: "KG",
    zoneId: "ops_khaled",
  },
  mohammed: {
    id: "mohammed",
    nameAr: "محمد الحربي",
    nameEn: "Mohammed Al-Harbi",
    roleAr: "مدير العمليات",
    roleEn: "Operations Manager",
    expAr: "خبرة 15 سنة",
    expEn: "15 yrs exp",
    isManager: true,
    avatarBg: "bg-emerald-600",
    initials: "MH",
    zoneId: "approval_chamber",
  },
};

export interface ZoneMeta {
  id: ZoneId;
  code: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  // 3D coordinates in glTF world space (Three.js Y-up: x_three = x_blender, y_three = z_blender, z_three = -y_blender)
  worldPos: [number, number, number];
  cameraTarget: [number, number, number];
  cameraZoom: number;
}

export const ZONES: ZoneMeta[] = [
  {
    id: "warehouse",
    code: "WH-01",
    titleAr: "المستودع الطبي والمخزون المحجوز",
    titleEn: "Medical Warehouse & Reserved Stock",
    subtitleAr: "24 جهازًا بالمخزون • 20 محجوزًا • 4 متاحة",
    subtitleEn: "24 in stock • 20 reserved • 4 available",
    worldPos: [-5.5, 2.3, -4.0],
    cameraTarget: [-5.5, 0.8, -3.5],
    cameraZoom: 1.45,
  },
  {
    id: "ops_ahmed",
    code: "OPS-EXP",
    titleAr: "مكتب الخبير — أحمد القحطاني",
    titleEn: "Expert Desk — Ahmed Al-Qahtani",
    subtitleAr: "مالك معرفة KN-001",
    subtitleEn: "KN-001 Knowledge Owner",
    worldPos: [0.65, 2.1, -0.8],
    cameraTarget: [0.65, 0.8, -0.8],
    cameraZoom: 1.55,
  },
  {
    id: "ops_khaled",
    code: "OPS-NEW",
    titleAr: "مكتب العمليات — خالد الغامدي",
    titleEn: "Operations Desk — Khaled Al-Ghamdi",
    subtitleAr: "استرجاع المعرفة والتحقق",
    subtitleEn: "Retrieval & Transfer Verification",
    worldPos: [0.65, 2.1, 3.4],
    cameraTarget: [0.65, 0.8, 3.4],
    cameraZoom: 1.55,
  },
  {
    id: "server_core",
    code: "MEM-AI",
    titleAr: "نواة الذاكرة المؤسسية الذكية",
    titleEn: "AI Institutional Memory Core",
    subtitleAr: "معرفة معتمدة + 6 حالات تاريخية",
    subtitleEn: "Approved Memory + 6 Historical Cases",
    worldPos: [5.0, 2.4, -5.2],
    cameraTarget: [5.0, 0.8, -5.0],
    cameraZoom: 1.5,
  },
  {
    id: "approval_chamber",
    code: "GOV-01",
    titleAr: "غرفة الاعتماد والاستشراف — محمد الحربي",
    titleEn: "Approval & Foresight Chamber — Mohammed",
    subtitleAr: "حوكمة المعرفة واستشراف المخاطر",
    subtitleEn: "Governance & Knowledge Foresight",
    worldPos: [6.8, 2.3, 1.5],
    cameraTarget: [6.8, 0.8, 1.5],
    cameraZoom: 1.5,
  },
  {
    id: "order_intake",
    code: "SO-10482",
    titleAr: "استقبال طلبات المستشفيات",
    titleEn: "Hospital Order Intake",
    subtitleAr: "طلب SO-10482 • 10 أجهزة • 180,000 ريال",
    subtitleEn: "Order SO-10482 • 10 devices • SAR 180,000",
    worldPos: [-5.6, 2.2, 4.0],
    cameraTarget: [-5.6, 0.8, 4.0],
    cameraZoom: 1.5,
  },
];

export const HISTORICAL_CASES: HistoricalCase[] = [
  {
    id: "CASE-001",
    monthAr: "سبتمبر",
    monthEn: "September",
    reasonKey: "reserved_stock",
    reasonAr: "كميات محجوزة",
    reasonEn: "Reserved Stock",
    orderValueSar: 145000,
  },
  {
    id: "CASE-002",
    monthAr: "سبتمبر",
    monthEn: "September",
    reasonKey: "credit_approval",
    reasonAr: "تأخر موافقة ائتمانية",
    reasonEn: "Credit Approval Delay",
    orderValueSar: 92000,
  },
  {
    id: "CASE-003",
    monthAr: "أكتوبر",
    monthEn: "October",
    reasonKey: "reserved_stock",
    reasonAr: "كميات محجوزة",
    reasonEn: "Reserved Stock",
    orderValueSar: 210000,
  },
  {
    id: "CASE-004",
    monthAr: "أكتوبر",
    monthEn: "October",
    reasonKey: "order_data_error",
    reasonAr: "خطأ في بيانات الطلب",
    reasonEn: "Order Data Error",
    orderValueSar: 64000,
  },
  {
    id: "CASE-005",
    monthAr: "نوفمبر",
    monthEn: "November",
    reasonKey: "reserved_stock",
    reasonAr: "كميات محجوزة",
    reasonEn: "Reserved Stock",
    orderValueSar: 165000,
  },
  {
    id: "CASE-006",
    monthAr: "نوفمبر",
    monthEn: "November",
    reasonKey: "reserved_stock",
    reasonAr: "كميات محجوزة",
    reasonEn: "Reserved Stock",
    orderValueSar: 180000,
  },
];

export const INITIAL_DEMO_STATE: DemoState = {
  knowledgeCards: [],
  transferStatus: "not_started",
  orderSO10482Resolved: false,
  initiatives: [],
  auditLog: [
    {
      id: "log-0",
      timestamp: "09:15",
      actorAr: "نظام الطلبات",
      actorEn: "Order System",
      actionAr: "استلام طلب مستشفى SO-10482 (10 أجهزة — 180,000 ريال) وتعثر الشحن بسبب 20 جهازًا محجوزًا",
      actionEn: "Received Hospital Order SO-10482 (10 devices — SAR 180,000); dispatch blocked by 20 reserved units",
    },
  ],
};

export const KN001_TEMPLATE: Omit<KnowledgeCard, "status" | "approverAr" | "approverEn" | "approvedAt"> = {
  id: "KN-001",
  titleAr: "معالجة الطلبات المتأخرة بسبب الكميات المحجوزة",
  titleEn: "Handling Delayed Orders Caused by Reserved Stock",
  ownerId: "ahmed",
  ownerNameAr: "أحمد القحطاني",
  ownerNameEn: "Ahmed Al-Qahtani",
  departmentAr: "العمليات التشغيلية",
  departmentEn: "Operations",
  processAr: "تنفيذ طلبات المستشفيات الاستثنائية",
  processEn: "Hospital Order Exception Fulfillment",
  typeAr: "خبرة تشغيلية",
  typeEn: "Operational Tacit Knowledge",
  criticality: "critical",
  causeAr: "النظام يعرض إجمالي المخزون (24 جهازًا) دون تمييز واضح للكميات المحجوزة لعملاء آخرين (20 جهازًا).",
  causeEn: "ERP shows total inventory (24 devices) without separating quantities reserved for other hospitals (20 devices).",
  solutionAr: "التحقق من الكميات المحجوزة والشحنات القادمة، والتواصل مع مسؤول المخزون، وعرض التسليم الجزئي على العميل.",
  solutionEn: "Verify reserved allocations & incoming shipments, coordinate with inventory lead, and offer partial delivery.",
  stepsAr: [
    "التحقق فورًا من الكميات المحجوزة مقابل المتاح الفعلي (4 أجهزة فقط).",
    "مراجعة موعد وصول الشحنات القادمة من الموردين.",
    "التواصل مع مسؤول المخزون لتأكيد إمكانية تخصيص 6 أجهزة إضافية.",
    "عرض خيار التسليم الجزئي على المستشفى بعد الحصول على الموافقات اللازمة.",
  ],
  stepsEn: [
    "Immediately verify reserved allocations vs. actually available stock (4 devices only).",
    "Check arrival schedule for incoming supplier shipments.",
    "Coordinate with the inventory officer to allocate 6 additional devices.",
    "Offer partial delivery to the hospital after obtaining required approvals.",
  ],
  exceptionAr: "يُمنع إلغاء الحجوزات السابقة لعملاء آخرين دون موافقة رسمية من مدير العمليات.",
  exceptionEn: "Never cancel existing customer reservations without formal approval from the Operations Manager.",
  lessonAr: "عدم تأكيد موعد التسليم للمستشفى قبل التحقق من الكميات المتاحة غير المحجوزة.",
  lessonEn: "Never confirm a hospital delivery date before checking unreserved available stock.",
  version: "v1.0",
  qualifiedEmployeesAr: ["أحمد القحطاني"],
  qualifiedEmployeesEn: ["Ahmed Al-Qahtani"],
  usageCount: 0,
  zoneId: "ops_ahmed",
  keywords: [
    "10482",
    "محجوز",
    "محجوزة",
    "مخزون",
    "أجهزة",
    "طلب",
    "شحن",
    "تأخر",
    "reserved",
    "stock",
    "inventory",
    "order",
    "delay",
    "device",
    "24",
    "10",
  ],
};
