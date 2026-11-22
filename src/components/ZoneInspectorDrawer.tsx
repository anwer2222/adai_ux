"use client";

import React from "react";
import {
  DemoState,
  Lang,
  UserRole,
  ZoneId,
  ZONES,
} from "@/data/demoData";
import {
  X,
  Package,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  PlusCircle,
  BarChart3,
  Award,
  ShieldCheck,
} from "lucide-react";

interface ZoneInspectorDrawerProps {
  lang: Lang;
  zoneId: ZoneId | null;
  currentUser: UserRole;
  demoState: DemoState;
  onClose: () => void;
  onOpenAddKnowledge: () => void;
  onOpenHelpAssistant: () => void;
  onOpenManagerDeck: () => void;
  onOpenRecognition: () => void;
  onOpenTransferTest: () => void;
}

export default function ZoneInspectorDrawer({
  lang,
  zoneId,
  currentUser,
  demoState,
  onClose,
  onOpenAddKnowledge,
  onOpenHelpAssistant,
  onOpenManagerDeck,
  onOpenRecognition,
  onOpenTransferTest,
}: ZoneInspectorDrawerProps) {
  if (!zoneId) return null;
  const zone = ZONES.find((z) => z.id === zoneId);
  if (!zone) return null;

  const kn001 = demoState.knowledgeCards.find((k) => k.id === "KN-001");
  const approvedCards = demoState.knowledgeCards.filter(
    (k) => k.status === "approved"
  );
  const pendingCards = demoState.knowledgeCards.filter(
    (k) => k.status === "pending_approval"
  );

  return (
    <aside className="w-full sm:w-[370px] h-full bg-white border-s border-slate-200 shadow-xl flex flex-col z-30">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex items-start justify-between gap-2 bg-slate-50/70">
        <div>
          <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800 mb-1">
            {zone.code}
          </span>
          <h3 className="text-base font-bold text-slate-900 leading-snug">
            {lang === "ar" ? zone.titleAr : zone.titleEn}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === "ar" ? zone.subtitleAr : zone.subtitleEn}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {/* Warehouse & Order Intake live SO-10482 Stock Card */}
        {(zoneId === "warehouse" || zoneId === "order_intake") && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-teal-600" />
                {lang === "ar" ? "طلب العميل SO-10482" : "Customer Order SO-10482"}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  demoState.orderSO10482Resolved
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {demoState.orderSO10482Resolved
                  ? lang === "ar"
                    ? "تم الحل (تسليم جزئي)"
                    : "Resolved (Partial)"
                  : lang === "ar"
                  ? "متعثر (نقص 6 أجهزة)"
                  : "Blocked (6 Short)"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white rounded-lg p-2 border border-slate-200">
                <div className="text-[11px] text-slate-500">
                  {lang === "ar" ? "قيمة الطلب" : "Order Value"}
                </div>
                <div className="font-bold text-slate-900">180,000 SAR</div>
              </div>
              <div className="bg-white rounded-lg p-2 border border-slate-200">
                <div className="text-[11px] text-slate-500">
                  {lang === "ar" ? "المطلوب للمستشفى" : "Requested"}
                </div>
                <div className="font-bold text-slate-900">
                  10 {lang === "ar" ? "أجهزة" : "Devices"}
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                <div className="text-[11px] text-amber-700">
                  {lang === "ar" ? "محجوز لعملاء آخرين" : "Reserved Stock"}
                </div>
                <div className="font-bold text-amber-900">20 / 24</div>
              </div>
              <div className="bg-teal-50 rounded-lg p-2 border border-teal-200">
                <div className="text-[11px] text-teal-700">
                  {lang === "ar" ? "المتاح فعليًا" : "Actually Available"}
                </div>
                <div className="font-bold text-teal-900">
                  4 {lang === "ar" ? "أجهزة" : "Devices"}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === "ar"
                ? "المشكلة ليست في نظام المخزون، بل في المعرفة البشرية اللازمة للتعامل مع الاستثناءات دون إلغاء الحجوزات السابقة."
                : "The bottleneck is not the ERP system — it is the undocumented human expertise needed to handle reserved-stock exceptions."}
            </p>
          </div>
        )}

        {/* Ahmed's Expert Desk */}
        {zoneId === "ops_ahmed" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {lang === "ar"
                  ? "أحمد القحطاني — خبير العمليات (12 سنة)"
                  : "Ahmed Al-Qahtani — Senior Expert (12 yrs)"}
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                {!kn001
                  ? lang === "ar"
                    ? "يمتلك خبرة حرجة غير موثقة حول معالجة الطلبات المحجوزة، وسيغادر في إجازة لمدة أسبوعين."
                    : "Holds critical undocumented expertise on reserved-stock exceptions and is going on a 2-week leave."
                  : demoState.transferStatus === "verified"
                  ? lang === "ar"
                    ? "تم توثيق خبرته (KN-001) ونقلها والتحقق من جاهزية خالد — انخفضت مخاطر الاعتماد الفردي."
                    : "Expertise captured (KN-001) and verified with Khaled — single-expert risk lowered."
                  : lang === "ar"
                  ? "تم استخلاص KN-001، لكنه ما زال الموظف الوحيد المؤهل عمليًا حتى يتم التحقق من نقل المعرفة."
                  : "KN-001 captured, but Ahmed remains the sole certified expert until transfer is verified."}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenAddKnowledge}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                {lang === "ar"
                  ? "بدء المقابلة المعرفية (أضف معرفة)"
                  : "Start AI Knowledge Interview"}
              </button>
              <button
                onClick={onOpenRecognition}
                className="w-full flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold py-2 px-4 rounded-xl transition cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-600" />
                {lang === "ar"
                  ? "تقدير الأثر المعرفي لأحمد"
                  : "View Ahmed's Impact Recognition"}
              </button>
            </div>
          </div>
        )}

        {/* Khaled's Desk */}
        {zoneId === "ops_khaled" && (
          <div className="space-y-3">
            <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3.5">
              <div className="font-bold text-sky-900 mb-1">
                {lang === "ar"
                  ? "خالد الغامدي — أخصائي عمليات جديد (3 أشهر)"
                  : "Khaled Al-Ghamdi — New Specialist (3 mos)"}
              </div>
              <p className="text-xs text-sky-800 leading-relaxed">
                {lang === "ar"
                  ? "يواجه طلب المستشفى SO-10482 أثناء غياب أحمد، ويعتمد على المساعد المعرفي المعتمد ومسار التحقق العملي."
                  : "Handles hospital order SO-10482 while Ahmed is away using the Approved AI Assistant and practical transfer scenario."}
              </p>
            </div>

            <button
              onClick={onOpenHelpAssistant}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              {lang === "ar"
                ? "ساعدني في أداء عملي (استرجاع)"
                : "Help Me Do My Job (Retrieval)"}
            </button>

            {demoState.transferStatus === "assigned" && (
              <button
                onClick={onOpenTransferTest}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                {lang === "ar"
                  ? "ابدأ اختبار السيناريو التطبيقي"
                  : "Take Practical Transfer Scenario"}
              </button>
            )}
          </div>
        )}

        {/* Approval Chamber & Server Core */}
        {(zoneId === "approval_chamber" || zoneId === "server_core") && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-teal-50 border border-teal-200 p-3 text-center">
                <div className="text-2xl font-bold text-teal-700">
                  {approvedCards.length}
                </div>
                <div className="text-[11px] text-teal-800 font-medium">
                  {lang === "ar" ? "معرفة معتمدة" : "Approved Cards"}
                </div>
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-center">
                <div className="text-2xl font-bold text-amber-700">
                  {pendingCards.length}
                </div>
                <div className="text-[11px] text-amber-800 font-medium">
                  {lang === "ar" ? "بانتظار الاعتماد" : "Pending Review"}
                </div>
              </div>
            </div>

            <button
              onClick={onOpenManagerDeck}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-teal-400" />
              {lang === "ar"
                ? "فتح لوحة المدير والاستشراف"
                : "Open Manager & Foresight Deck"}
            </button>
          </div>
        )}

        {/* Linked Knowledge Cards in Institutional Memory */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            {lang === "ar"
              ? "الذاكرة المؤسسية المسجلة"
              : "Recorded Institutional Memory"}
          </div>

          {demoState.knowledgeCards.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-500 text-center">
              {lang === "ar"
                ? "لا توجد بطاقات معرفية بعد. ابدأ بالمقابلة المعرفية مع أحمد لاستخلاص KN-001."
                : "No knowledge cards captured yet. Start Ahmed's AI interview to extract KN-001."}
            </div>
          ) : (
            <div className="space-y-2">
              {demoState.knowledgeCards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-xl border border-slate-200 p-3 bg-white shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-teal-700">
                      {card.id} ({card.version})
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        card.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {card.status === "approved"
                        ? lang === "ar"
                          ? "معتمدة ✓"
                          : "Approved ✓"
                        : lang === "ar"
                        ? "بانتظار الاعتماد"
                        : "Pending Approval"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {lang === "ar" ? card.titleAr : card.titleEn}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                    <span>
                      {lang === "ar" ? "المساهم:" : "Owner:"}{" "}
                      {lang === "ar" ? card.ownerNameAr : card.ownerNameEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-500" />
                      {card.usageCount}{" "}
                      {lang === "ar" ? "استخدام" : "uses"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contextual Role Footer Hint */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
        <span>
          {lang === "ar" ? "الدور النشط:" : "Active Role:"}{" "}
          <strong className="text-slate-700">
            {currentUser === "ahmed"
              ? lang === "ar"
                ? "أحمد (خبير)"
                : "Ahmed (Expert)"
              : currentUser === "khaled"
              ? lang === "ar"
                ? "خالد (موظف جديد)"
                : "Khaled (New)"
              : lang === "ar"
              ? "محمد (مدير)"
              : "Mohammed (Manager)"}
          </strong>
        </span>
        <span className="text-teal-700 font-medium">ALPHA Medical</span>
      </div>
    </aside>
  );
}
