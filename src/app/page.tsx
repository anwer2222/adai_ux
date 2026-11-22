"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  DemoState,
  INITIAL_DEMO_STATE,
  KnowledgeCard,
  Lang,
  PERSONAS,
  UserRole,
  ZoneId,
} from "@/data/demoData";
import ZoneInspectorDrawer from "@/components/ZoneInspectorDrawer";
import KnowledgeMap2D from "@/components/KnowledgeMap2D";
import {
  AddKnowledgeModal,
  HelpAssistantModal,
  ManagerDeckModal,
  RecognitionModal,
  TransferTestModal,
} from "@/components/KnowledgeModals";
import {
  MessageSquare,
  PlusCircle,
  BarChart3,
  Globe,
  RotateCcw,
  Award,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const IsometricMap3D = dynamic(() => import("@/components/IsometricMap3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 text-sm">
      Loading 3D Command Deck...
    </div>
  ),
});

const STORAGE_KEY = "adai_ux_demo_state_v1";

interface GuidedStep {
  num: number;
  titleAr: string;
  titleEn: string;
  role: UserRole;
  zone: ZoneId;
}

const GUIDED_STEPS: GuidedStep[] = [
  {
    num: 1,
    titleAr: "1. استخلاص المعرفة (أحمد)",
    titleEn: "1. Extract (Ahmed)",
    role: "ahmed",
    zone: "ops_ahmed",
  },
  {
    num: 2,
    titleAr: "2. الاعتماد (محمد)",
    titleEn: "2. Approve (Mohammed)",
    role: "mohammed",
    zone: "approval_chamber",
  },
  {
    num: 3,
    titleAr: "3. الاسترجاع (خالد)",
    titleEn: "3. Retrieve (Khaled)",
    role: "khaled",
    zone: "ops_khaled",
  },
  {
    num: 4,
    titleAr: "4. نقل المعرفة والمخاطر",
    titleEn: "4. Risk & Transfer",
    role: "mohammed",
    zone: "warehouse",
  },
  {
    num: 5,
    titleAr: "5. الاستشراف المستقبلي",
    titleEn: "5. Foresight (67%)",
    role: "mohammed",
    zone: "server_core",
  },
  {
    num: 6,
    titleAr: "6. تقدير الموظف (أحمد)",
    titleEn: "6. Recognition",
    role: "ahmed",
    zone: "ops_ahmed",
  },
];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ar");
  const [currentUser, setCurrentUser] = useState<UserRole>("ahmed");
  const [demoState, setDemoState] = useState<DemoState>(INITIAL_DEMO_STATE);
  const [selectedZone, setSelectedZone] = useState<ZoneId | null>("ops_ahmed");
  const [focusTrigger, setFocusTrigger] = useState<{
    zone: ZoneId | null;
    seq: number;
  }>({ zone: null, seq: 0 });
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [managerModalTab, setManagerModalTab] = useState<
    "approvals" | "risk" | "foresight" | "audit" | null
  >(null);
  const [showTransferTest, setShowTransferTest] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Load persisted demo state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setDemoState(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist demo state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoState));
    } catch {
      // ignore
    }
  }, [demoState]);

  // Sync document dir & lang
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const showToastMsg = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3800);
  };

  const nowTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Actions
  const handleAddCard = (card: KnowledgeCard) => {
    setDemoState((prev) => ({
      ...prev,
      knowledgeCards: [...prev.knowledgeCards, card],
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: card.ownerNameAr,
          actorEn: card.ownerNameEn,
          actionAr: `استخلص بطاقة المعرفة ${card.id} وأرسلها للاعتماد`,
          actionEn: `Extracted knowledge card ${card.id} and submitted for approval`,
        },
        ...prev.auditLog,
      ],
    }));
    setShowAddModal(false);
    showToastMsg(
      lang === "ar"
        ? `تم إرسال ${card.id} إلى محمد الحربي للاعتماد ✓`
        : `${card.id} submitted to Mohammed Al-Harbi for approval ✓`
    );
  };

  const handleApproveCard = (cardId: string) => {
    setDemoState((prev) => ({
      ...prev,
      knowledgeCards: prev.knowledgeCards.map((c) =>
        c.id === cardId
          ? {
              ...c,
              status: "approved",
              approverAr: "محمد الحربي",
              approverEn: "Mohammed Al-Harbi",
              approvedAt: nowTime(),
            }
          : c
      ),
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "محمد الحربي",
          actorEn: "Mohammed Al-Harbi",
          actionAr: `اعتمد بطاقة المعرفة ${cardId} (v1.0) وأضافها للذاكرة المؤسسية`,
          actionEn: `Approved knowledge card ${cardId} (v1.0) into Institutional Memory`,
        },
        ...prev.auditLog,
      ],
    }));
    showToastMsg(
      lang === "ar"
        ? `تم اعتماد ${cardId} — أصبحت متاحة للاسترجاع الآن ✓`
        : `${cardId} approved — now live for retrieval ✓`
    );
  };

  const handleConfirmApplied = (cardId: string) => {
    setDemoState((prev) => ({
      ...prev,
      orderSO10482Resolved: true,
      knowledgeCards: prev.knowledgeCards.map((c) =>
        c.id === cardId ? { ...c, usageCount: c.usageCount + 1 } : c
      ),
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "خالد الغامدي",
          actorEn: "Khaled Al-Ghamdi",
          actionAr: `طبّق المعرفة المعتمدة ${cardId} وعالج طلب SO-10482 بالتسليم الجزئي`,
          actionEn: `Applied certified ${cardId} and resolved order SO-10482 via partial delivery`,
        },
        ...prev.auditLog,
      ],
    }));
    setShowHelpModal(false);
    showToastMsg(
      lang === "ar"
        ? "تم تسجيل نجاح التطبيق ومعالجة طلب SO-10482 ✓"
        : "Outcome verified & Order SO-10482 resolved ✓"
    );
  };

  const handleAssignTransfer = () => {
    setDemoState((prev) => ({
      ...prev,
      transferStatus: "assigned",
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "محمد الحربي",
          actorEn: "Mohammed Al-Harbi",
          actionAr: "كلّف خالد الغامدي بمسار نقل المعرفة الحرجة KN-001",
          actionEn: "Assigned Khaled Al-Ghamdi to KN-001 Verified Transfer Path",
        },
        ...prev.auditLog,
      ],
    }));
    showToastMsg(
      lang === "ar"
        ? "تم تكليف خالد — بدّل لحساب خالد لإكمال الاختبار التطبيقي"
        : "Assigned to Khaled — switch to Khaled to take the practical scenario"
    );
  };

  const handlePassTransferTest = () => {
    setDemoState((prev) => ({
      ...prev,
      transferStatus: "test_passed",
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "خالد الغامدي",
          actorEn: "Khaled Al-Ghamdi",
          actionAr: "اجتاز السيناريو التطبيقي لـ KN-001 وبانتظار تأكيد المدير",
          actionEn: "Passed KN-001 practical scenario; awaiting manager certification",
        },
        ...prev.auditLog,
      ],
    }));
    setShowTransferTest(false);
    showToastMsg(
      lang === "ar"
        ? "أحسنت! بانتظار اعتماد محمد لتحديث خريطة المخاطر"
        : "Passed! Switch to Mohammed to certify readiness & update the 3D heatmap"
    );
  };

  const handleVerifyTransfer = () => {
    setDemoState((prev) => ({
      ...prev,
      transferStatus: "verified",
      knowledgeCards: prev.knowledgeCards.map((c) =>
        c.id === "KN-001"
          ? {
              ...c,
              qualifiedEmployeesAr: ["أحمد القحطاني", "خالد الغامدي"],
              qualifiedEmployeesEn: ["Ahmed Al-Qahtani", "Khaled Al-Ghamdi"],
            }
          : c
      ),
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "محمد الحربي",
          actorEn: "Mohammed Al-Harbi",
          actionAr: "اعتمد جاهزية خالد العملية — انخفضت مخاطر الخبير الواحد في الخريطة 3D!",
          actionEn: "Certified Khaled's readiness — 3D Bus-Factor Heatmap updated to Low Risk!",
        },
        ...prev.auditLog,
      ],
    }));
    showToastMsg(
      lang === "ar"
        ? "تم اعتماد جاهزية خالد — تحولت الخريطة ثلاثية الأبعاد للأخضر ✓"
        : "Khaled certified — 3D Bus-Factor Ring turned Emerald Green ✓"
    );
  };

  const handleLaunchInitiative = () => {
    setDemoState((prev) => ({
      ...prev,
      initiatives: [
        {
          id: "INIT-01",
          titleAr: "تطوير خطوة التحقق المسبق من المخزون غير المحجوز",
          titleEn: "Pre-Confirmation Unreserved Stock Gate Pilot",
          ownersAr: "أحمد القحطاني وخالد الغامدي",
          ownersEn: "Ahmed Al-Qahtani & Khaled Al-Ghamdi",
          status: "active",
          createdAt: nowTime(),
        },
      ],
      auditLog: [
        {
          id: `log-${Date.now()}`,
          timestamp: nowTime(),
          actorAr: "محمد الحربي",
          actorEn: "Mohammed Al-Harbi",
          actionAr: "أطلق مبادرة تحسين بناءً على قراءة الاستشراف (67% كميات محجوزة)",
          actionEn: "Launched Improvement Initiative from 67% Reserved Stock Foresight",
        },
        ...prev.auditLog,
      ],
    }));
    showToastMsg(
      lang === "ar"
        ? "تم إطلاق مبادرة التحسين وتكليف أحمد وخالد ✓"
        : "Improvement Initiative launched with Ahmed & Khaled ✓"
    );
  };

  const handleResetDemo = () => {
    setDemoState(INITIAL_DEMO_STATE);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser("ahmed");
    setSelectedZone("ops_ahmed");
    setActiveSceneIdx(0);
    setFocusTrigger((p) => ({ zone: null, seq: p.seq + 1 }));
    showToastMsg(lang === "ar" ? "تمت إعادة ضبط الديمو" : "Demo reset to start");
  };

  const goToGuidedScene = (idx: number) => {
    const step = GUIDED_STEPS[idx];
    if (!step) return;
    setActiveSceneIdx(idx);
    setCurrentUser(step.role);
    setSelectedZone(step.zone);
    setViewMode("3d");
    setFocusTrigger((p) => ({ zone: step.zone, seq: p.seq + 1 }));
  };

  const persona = PERSONAS[currentUser];
  const pendingCount = demoState.knowledgeCards.filter(
    (k) => k.status === "pending_approval"
  ).length;
  const hasKN001 = demoState.knowledgeCards.some((k) => k.id === "KN-001");

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* TOP BAR: Brand + Role Switcher + Language + Reset */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-3 shrink-0 z-30 shadow-2xs">
        {/* Brand */} 
        <div className="flex items-center gap-3 min-w-0">
        <Image className="hero-logo" src="/logo_s.jpg" alt="شعار ADAI" width={50} height={75} priority />

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                ADAI
              </span>
              <span className="hidden md:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                ALPHA Medical Solutions
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">
              {lang === "ar"
                ? "الخريطة التشغيلية الذكية — إدارة العمليات (جدة)"
                : "Institutional Command Deck — Operations Dept (Jeddah)"}
            </p>
          </div>
        </div>

        {/* Persona Switcher (3 Demo Accounts) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(["ahmed", "khaled", "mohammed"] as UserRole[]).map((roleKey) => {
            const p = PERSONAS[roleKey];
            const active = currentUser === roleKey;
            const showDot =
              (roleKey === "mohammed" &&
                (pendingCount > 0 || demoState.transferStatus === "test_passed")) ||
              (roleKey === "khaled" && demoState.transferStatus === "assigned");
            return (
              <button
                key={roleKey}
                onClick={() => {
                  setCurrentUser(roleKey);
                  setSelectedZone(p.zoneId);
                  setFocusTrigger((prev) => ({
                    zone: p.zoneId,
                    seq: prev.seq + 1,
                  }));
                }}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  active
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full ${p.avatarBg} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}
                >
                  {p.initials}
                </span>
                <span className="hidden lg:inline">
                  {lang === "ar" ? p.nameAr : p.nameEn}
                </span>
                {showDot && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 absolute -top-0.5 -end-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Controls: AR/EN + Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600" />
            {lang === "ar" ? "EN" : "العربية"}
          </button>
          <button
            onClick={handleResetDemo}
            title={lang === "ar" ? "إعادة ضبط الديمو" : "Reset Demo"}
            className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* SIMPLE ROLE ACTION BAR (Strictly 2 actions for Employee, 3 for Manager per use-case.md!) */}
      <div className="bg-white/90 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0 z-20">
        <div className="flex flex-wrap items-center gap-2">
          {/* Action 1: Help Me Do My Job */}
          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            {lang === "ar" ? "ساعدني في أداء عملي" : "Help Me Do My Job"}
          </button>

          {/* Action 2: Add Knowledge */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {lang === "ar" ? "أضف معرفة" : "Add Knowledge"}
          </button>

          {/* Action 3: ONLY for Manager (Mohammed) */}
          {persona.isManager && (
            <button
              onClick={() =>
                setManagerModalTab(pendingCount > 0 ? "approvals" : "foresight")
              }
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-teal-400" />
              {lang === "ar"
                ? "حالة المعرفة ومستقبل إدارتي"
                : "Department Knowledge & Foresight"}
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-amber-500 text-white">
                  {pendingCount}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Contextual Employee Badges (Khaled's Assigned Transfer / Ahmed's Recognition) */}
        <div className="flex items-center gap-2">
          {currentUser === "khaled" &&
            demoState.transferStatus === "assigned" && (
              <button
                onClick={() => setShowTransferTest(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold animate-pulse cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                {lang === "ar"
                  ? "لديك اختبار نقل معرفة (KN-001)"
                  : "Pending Transfer Test (KN-001)"}
              </button>
            )}
          {currentUser === "ahmed" && (
            <button
              onClick={() => setShowRecognition(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600" />
              {lang === "ar" ? "أثرك المعرفي" : "My Knowledge Impact"}
            </button>
          )}
        </div>
      </div>

      {/* MAIN WORKSPACE: 3D Map (or 2D Fallback) + Right Inspector Drawer */}
      <main className="flex-1 flex min-h-0 relative overflow-hidden">
        <div className="flex-1 h-full relative">
          {viewMode === "3d" ? (
            <IsometricMap3D
              lang={lang}
              demoState={demoState}
              selectedZone={selectedZone}
              onSelectZone={setSelectedZone}
              focusZoneTrigger={focusTrigger}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
          ) : (
            <KnowledgeMap2D
              lang={lang}
              demoState={demoState}
              onBackTo3D={() => setViewMode("3d")}
              onOpenManagerDeck={() => setManagerModalTab("risk")}
            />
          )}
        </div>

        {viewMode === "3d" && selectedZone && (
          <ZoneInspectorDrawer
            lang={lang}
            zoneId={selectedZone}
            currentUser={currentUser}
            demoState={demoState}
            onClose={() => setSelectedZone(null)}
            onOpenAddKnowledge={() => setShowAddModal(true)}
            onOpenHelpAssistant={() => setShowHelpModal(true)}
            onOpenManagerDeck={() =>
              setManagerModalTab(pendingCount > 0 ? "approvals" : "foresight")
            }
            onOpenRecognition={() => setShowRecognition(true)}
            onOpenTransferTest={() => setShowTransferTest(true)}
          />
        )}
      </main>

      {/* BOTTOM GUIDED 6-SCENE DEMO WALKTHROUGH BAR */}
      <footer className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between gap-2 shrink-0 z-20 overflow-x-auto">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span className="hidden sm:inline">
            {lang === "ar" ? "مسار الديمو:" : "Demo Flow:"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {GUIDED_STEPS.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => goToGuidedScene(idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                activeSceneIdx === idx
                  ? "bg-teal-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {lang === "ar" ? s.titleAr : s.titleEn}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            disabled={activeSceneIdx === 0}
            onClick={() => goToGuidedScene(activeSceneIdx - 1)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
          >
            {lang === "ar" ? (
              <ChevronRight className="w-3.5 h-3.5" />
            ) : (
              <ChevronLeft className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            disabled={activeSceneIdx === GUIDED_STEPS.length - 1}
            onClick={() => goToGuidedScene(activeSceneIdx + 1)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
          >
            {lang === "ar" ? (
              <ChevronLeft className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </footer>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-16 start-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-slate-700">
          {toast}
        </div>
      )}

      {/* MODALS */}
      {showAddModal && (
        <AddKnowledgeModal
          lang={lang}
          currentUser={currentUser}
          existingCount={demoState.knowledgeCards.length}
          hasKN001={hasKN001}
          onClose={() => setShowAddModal(false)}
          onSubmitCard={handleAddCard}
        />
      )}

      {showHelpModal && (
        <HelpAssistantModal
          lang={lang}
          demoState={demoState}
          onClose={() => setShowHelpModal(false)}
          onConfirmApplied={handleConfirmApplied}
        />
      )}

      {managerModalTab && (
        <ManagerDeckModal
          lang={lang}
          demoState={demoState}
          initialTab={managerModalTab}
          onClose={() => setManagerModalTab(null)}
          onApproveCard={handleApproveCard}
          onAssignTransfer={handleAssignTransfer}
          onVerifyTransfer={handleVerifyTransfer}
          onLaunchInitiative={handleLaunchInitiative}
        />
      )}

      {showTransferTest && (
        <TransferTestModal
          lang={lang}
          onClose={() => setShowTransferTest(false)}
          onPassTest={handlePassTransferTest}
        />
      )}

      {showRecognition && (
        <RecognitionModal
          lang={lang}
          demoState={demoState}
          onClose={() => setShowRecognition(false)}
        />
      )}
    </div>
  );
}
