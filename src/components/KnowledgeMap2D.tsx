"use client";

import React from "react";
import { DemoState, Lang } from "@/data/demoData";
import {
  Box,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface KnowledgeMap2DProps {
  lang: Lang;
  demoState: DemoState;
  onBackTo3D: () => void;
  onOpenManagerDeck: () => void;
}

export default function KnowledgeMap2D({
  lang,
  demoState,
  onBackTo3D,
  onOpenManagerDeck,
}: KnowledgeMap2DProps) {
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const rows =
    demoState.knowledgeCards.length > 0
      ? demoState.knowledgeCards
      : [
          {
            id: "GAP-001",
            titleAr: "معالجة الطلبات المتأخرة بسبب الكميات المحجوزة (غير موثقة)",
            titleEn: "Delayed Orders from Reserved Stock (Undocumented)",
            ownerNameAr: "أحمد القحطاني",
            ownerNameEn: "Ahmed Al-Qahtani",
            departmentAr: "العمليات التشغيلية",
            departmentEn: "Operations",
            processAr: "تنفيذ طلبات المستشفيات الاستثنائية",
            processEn: "Hospital Order Exception Fulfillment",
            criticality: "critical" as const,
            status: "draft" as const,
            qualifiedEmployeesAr: ["أحمد القحطاني"],
            qualifiedEmployeesEn: ["Ahmed Al-Qahtani"],
            usageCount: 0,
          },
        ];

  return (
    <div className="w-full h-full bg-slate-50 overflow-y-auto p-6">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {lang === "ar"
                ? "خريطة المعرفة المؤسسية (2D Knowledge Map)"
                : "Institutional Knowledge Map (2D Fallback View)"}
            </h2>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 flex-wrap">
              <span>{lang === "ar" ? "الإدارة" : "Department"}</span>
              <Arrow className="w-3 h-3" />
              <span>{lang === "ar" ? "العملية" : "Process"}</span>
              <Arrow className="w-3 h-3" />
              <span>{lang === "ar" ? "المعرفة المطلوبة" : "Required Knowledge"}</span>
              <Arrow className="w-3 h-3" />
              <span>{lang === "ar" ? "المالك" : "Owner"}</span>
              <Arrow className="w-3 h-3" />
              <span>{lang === "ar" ? "المؤهلون" : "Qualified"}</span>
              <Arrow className="w-3 h-3" />
              <span>{lang === "ar" ? "مستوى المخاطر" : "Loss Risk"}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenManagerDeck}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
            >
              {lang === "ar" ? "إدارة المخاطر والنقل" : "Manage Risk & Transfer"}
            </button>
            <button
              onClick={onBackTo3D}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition cursor-pointer"
            >
              <Box className="w-3.5 h-3.5" />
              {lang === "ar" ? "العودة للخريطة ثلاثية الأبعاد" : "Back to 3D Map"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
              <tr>
                <th className="p-3.5 text-start">{lang === "ar" ? "العملية / المعرفة" : "Process & Knowledge"}</th>
                <th className="p-3.5 text-start">{lang === "ar" ? "المالك" : "Owner"}</th>
                <th className="p-3.5 text-start">{lang === "ar" ? "الأهمية (Criticality)" : "Criticality"}</th>
                <th className="p-3.5 text-start">{lang === "ar" ? "حالة التوثيق" : "Status"}</th>
                <th className="p-3.5 text-start">{lang === "ar" ? "المؤهلون عمليًا" : "Qualified Staff"}</th>
                <th className="p-3.5 text-start">{lang === "ar" ? "مخاطر الفقدان" : "Loss Risk"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => {
                const qualified =
                  lang === "ar"
                    ? r.qualifiedEmployeesAr
                    : r.qualifiedEmployeesEn;
                const isLowRisk = qualified.length >= 2 && r.status === "approved";
                const isMedRisk = qualified.length === 1 && r.status === "approved";
                return (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="p-3.5">
                      <div className="text-[11px] font-bold text-teal-700">
                        {r.id} • {lang === "ar" ? r.processAr : r.processEn}
                      </div>
                      <div className="font-semibold text-slate-900 mt-0.5">
                        {lang === "ar" ? r.titleAr : r.titleEn}
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {lang === "ar" ? r.ownerNameAr : r.ownerNameEn}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        {lang === "ar" ? "حرجة" : "Critical"}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {r.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {lang === "ar" ? "معتمدة" : "Approved"}
                        </span>
                      ) : r.status === "pending_approval" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          {lang === "ar" ? "بانتظار الاعتماد" : "Pending"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {lang === "ar" ? "غير موثقة" : "Undocumented"}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {qualified.join("، ")}
                      </div>
                    </td>
                    <td className="p-3.5">
                      {isLowRisk ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                          {lang === "ar" ? "منخفض ✓" : "Low ✓"}
                        </span>
                      ) : isMedRisk ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          {lang === "ar" ? "مرتفع (خبير واحد)" : "High (1 Expert)"}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                          {lang === "ar" ? "حرج (غير موثق)" : "Severe (Undocumented)"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
