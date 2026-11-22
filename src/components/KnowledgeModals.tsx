"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DemoState,
  HISTORICAL_CASES,
  KN001_TEMPLATE,
  KnowledgeCard,
  Lang,
  PERSONAS,
  UserRole,
} from "@/data/demoData";
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Award,
  Lightbulb,
  FileCheck2,
  UserCheck,
  Clock,
  Lock,
  Mic,
  Square,
  Volume2,
} from "lucide-react";

interface ChatMsg {
  role: "ai" | "user";
  text: string;
  viaAudio?: boolean;
  audioDuration?: string;
}

/* ============================================================================
 * 1. ADD KNOWLEDGE MODAL (Simulated AI Conversational Extraction — Text + Audio)
 *    Exact conversation flow from txt/use-case.md (Scene 1)
 * ========================================================================== */
interface AddKnowledgeModalProps {
  lang: Lang;
  currentUser: UserRole;
  existingCount: number;
  hasKN001: boolean;
  onClose: () => void;
  onSubmitCard: (card: KnowledgeCard) => void;
}

export function AddKnowledgeModal({
  lang,
  currentUser,
  existingCount,
  hasKN001,
  onClose,
  onSubmitCard,
}: AddKnowledgeModalProps) {
  const persona = PERSONAS[currentUser];
  const [step, setStep] = useState<number>(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [aiTyping, setAiTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSec, setRecSec] = useState(0);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "ai",
      text:
        lang === "ar"
          ? `أهلًا ${persona.nameAr}. يمكنك الكتابة أو التحدث صوتيًا لشرح الموقف التشغيلي بصورة طبيعية — سأطرح عليك أسئلة متابعة وأستخلص بطاقة المعرفة تلقائيًا دون تعبئة أي نموذج.`
          : `Welcome ${persona.nameEn}. Type or speak naturally to share the operational experience — I'll ask follow-up questions and compile a structured Knowledge Card automatically.`,
    },
  ]);

  const [draftCard, setDraftCard] = useState<KnowledgeCard | null>(null);

  // Exact dialogue turns from txt/use-case.md (Scene 1: Knowledge Extraction)
  const quickRepliesAr = [
    "كثيرًا ما نواجه مشكلة عدم القدرة على تنفيذ طلبات العملاء رغم توفر المنتجات في نظام المخزون.",
    "النظام يعرض إجمالي المخزون، ولكن بعض الكميات تكون محجوزة لعملاء آخرين.",
    "لا يمكن إلغاء الحجوزات دون موافقة. أتحقق أولًا من الشحنات القادمة، ثم أتواصل مع مسؤول المخزون، وأعرض على العميل إمكانية التسليم الجزئي إذا كان ذلك مناسبًا.",
    "عدم تأكيد موعد التسليم للعميل قبل التحقق من الكميات المتاحة غير المحجوزة.",
  ];

  const quickRepliesEn = [
    "We often face an issue where we cannot fulfill customer orders even though products appear available in the inventory system.",
    "The system shows total inventory, but some quantities are already reserved for other customers.",
    "Reservations cannot be cancelled without approval. First I check incoming shipments, then contact the inventory officer, and offer the customer partial delivery if suitable.",
    "Never confirm a delivery date to the customer before verifying unreserved available quantities.",
  ];

  const followUpsAr = [
    "ما السبب الذي اكتشفته من خلال خبرتك؟",
    "كيف تتعامل مع هذه الحالة؟ وهل يمكنك إلغاء الحجوزات السابقة لتلبية طلب العميل الجديد؟",
    "ما أهم درس تعلمته لمنع تكرار المشكلة مستقبلًا؟",
  ];

  const followUpsEn = [
    "What root cause did you discover through your experience?",
    "How do you handle this situation? Can you cancel previous reservations to fulfill the new customer order?",
    "What is the most important lesson you learned to prevent this issue in the future?",
  ];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping, draftCard]);

  useEffect(() => {
    return () => {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
    };
  }, []);

  const handleSend = (
    textOverride?: string,
    viaAudio = false,
    audioDuration?: string
  ) => {
    if (aiTyping) return;
    const content = (textOverride ?? input).trim();
    if (!content) return;

    const nextAnswers = [...answers, content];
    setAnswers(nextAnswers);
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: content, viaAudio, audioDuration },
    ]);
    setAiTyping(true);

    const curStep = step;
    setTimeout(() => {
      setAiTyping(false);
      if (curStep < 3) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text: lang === "ar" ? followUpsAr[curStep] : followUpsEn[curStep],
          },
        ]);
        setStep(curStep + 1);
      } else {
        const isDefaultScenario =
          !hasKN001 &&
          (nextAnswers[0].includes("المخزون") ||
            nextAnswers[0].toLowerCase().includes("inventory") ||
            nextAnswers[0].toLowerCase().includes("stock"));

        const newId = !hasKN001 ? "KN-001" : `KN-00${existingCount + 1}`;
        const generated: KnowledgeCard = isDefaultScenario
          ? {
              ...KN001_TEMPLATE,
              id: "KN-001",
              status: "pending_approval",
            }
          : {
              id: newId,
              titleAr: nextAnswers[0].slice(0, 70),
              titleEn: nextAnswers[0].slice(0, 70),
              ownerId: currentUser,
              ownerNameAr: persona.nameAr,
              ownerNameEn: persona.nameEn,
              departmentAr: "العمليات التشغيلية",
              departmentEn: "Operations",
              processAr: "العمليات التشغيلية اليومية",
              processEn: "Daily Operational Workflows",
              typeAr: "خبرة تشغيلية",
              typeEn: "Operational Expertise",
              criticality: "high",
              causeAr: nextAnswers[1],
              causeEn: nextAnswers[1],
              solutionAr: nextAnswers[2],
              solutionEn: nextAnswers[2],
              stepsAr: [nextAnswers[2], nextAnswers[3]],
              stepsEn: [nextAnswers[2], nextAnswers[3]],
              exceptionAr: nextAnswers[2],
              exceptionEn: nextAnswers[2],
              lessonAr: nextAnswers[3],
              lessonEn: nextAnswers[3],
              status: "pending_approval",
              version: "v1.0",
              qualifiedEmployeesAr: [persona.nameAr],
              qualifiedEmployeesEn: [persona.nameEn],
              usageCount: 0,
              zoneId: persona.zoneId,
              keywords: nextAnswers
                .join(" ")
                .toLowerCase()
                .split(/\s+/)
                .filter((w) => w.length > 2),
            };

        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              lang === "ar"
                ? `تم استخلاص بطاقة المعرفة (${generated.id}) تلقائيًا من المحادثة دون الحاجة لتعبئة أي نموذج. راجعها أدناه قبل إرسالها للمدير (محمد الحربي) لاعتمادها.`
                : `Automatically extracted Knowledge Card (${generated.id}) from our conversation. Review it below before submitting to Mohammed Al-Harbi for approval.`,
          },
        ]);
        setDraftCard(generated);
        setStep(4);
      }
    }, 650);
  };

  // Simulated Voice/Audio Recording (transcribes the current turn!)
  const toggleVoiceRecording = () => {
    if (aiTyping) return;
    if (!recording) {
      setRecording(true);
      setRecSec(1);
      recTimerRef.current = setInterval(() => {
        setRecSec((s) => {
          if (s >= 3) {
            if (recTimerRef.current) clearInterval(recTimerRef.current);
            setRecording(false);
            const scripted =
              lang === "ar" ? quickRepliesAr[step] : quickRepliesEn[step];
            handleSend(scripted, true, "0:03");
            return 0;
          }
          return s + 1;
        });
      }, 750);
    } else {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      const dur = `0:0${Math.max(1, recSec)}`;
      setRecording(false);
      setRecSec(0);
      const scripted =
        lang === "ar" ? quickRepliesAr[step] : quickRepliesEn[step];
      handleSend(scripted, true, dur);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === "ar"
                  ? "المقابلة المعرفية الذكية — أضف معرفة"
                  : "AI Knowledge Interview — Add Knowledge"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "ar"
                  ? "محاكاة تفاعلية (نص أو صوت) وفق سيناريو ALPHA Medical Solutions"
                  : "Interactive Simulation (Text or Voice) — ALPHA Medical Solutions"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/40">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                  m.role === "user"
                    ? "bg-teal-600 text-white rounded-ee-sm"
                    : "bg-white border border-slate-200 text-slate-800 rounded-es-sm"
                }`}
              >
                {m.viaAudio && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-100 mb-1 pb-1 border-b border-teal-500/50">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>
                      {lang === "ar"
                        ? `تسجيل صوتي (${m.audioDuration || "0:03"}) — تم التفريغ تلقائيًا`
                        : `Voice Note (${m.audioDuration || "0:03"}) — Auto-Transcribed`}
                    </span>
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}

          {aiTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-es-sm px-4 py-3 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-teal-500 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          )}

          {/* Auto-generated Structured Card Preview */}
          {draftCard && (
            <div className="mt-4 rounded-2xl border-2 border-teal-500/40 bg-white p-4 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                  {draftCard.id} •{" "}
                  {lang === "ar"
                    ? "بانتظار الاعتماد (Draft)"
                    : "Draft — Pending Approval"}
                </span>
                <span className="text-xs text-slate-500">
                  {lang === "ar"
                    ? "المعتمد: محمد الحربي"
                    : "Approver: Mohammed Al-Harbi"}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500">
                  {lang === "ar"
                    ? "عنوان المعرفة (قابل للتعديل)"
                    : "Knowledge Title (Editable)"}
                </label>
                <input
                  value={lang === "ar" ? draftCard.titleAr : draftCard.titleEn}
                  onChange={(e) =>
                    setDraftCard({
                      ...draftCard,
                      titleAr: e.target.value,
                      titleEn: e.target.value,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                  <div className="font-bold text-slate-500 mb-1">
                    {lang === "ar" ? "السبب الجذري" : "Root Cause"}
                  </div>
                  <div className="text-slate-800">
                    {lang === "ar" ? draftCard.causeAr : draftCard.causeEn}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                  <div className="font-bold text-slate-500 mb-1">
                    {lang === "ar" ? "الحل العملي" : "Solution"}
                  </div>
                  <div className="text-slate-800">
                    {lang === "ar" ? draftCard.solutionAr : draftCard.solutionEn}
                  </div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200">
                  <div className="font-bold text-amber-800 mb-1">
                    {lang === "ar" ? "الاستثناء الحرج" : "Critical Exception"}
                  </div>
                  <div className="text-amber-950">
                    {lang === "ar"
                      ? draftCard.exceptionAr
                      : draftCard.exceptionEn}
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200">
                  <div className="font-bold text-emerald-800 mb-1">
                    {lang === "ar" ? "الدرس المستفاد" : "Lesson Learned"}
                  </div>
                  <div className="text-emerald-950">
                    {lang === "ar" ? draftCard.lessonAr : draftCard.lessonEn}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSubmitCard(draftCard)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                {lang === "ar"
                  ? "إرسال البطاقة إلى مدير العمليات للاعتماد"
                  : "Submit Card to Operations Manager for Approval"}
              </button>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input + Simulated Audio + Quick Reply Bar */}
        {step < 4 && (
          <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
            {recording ? (
              <div className="flex items-center justify-between gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-rose-700">
                    {lang === "ar"
                      ? `جاري التسجيل الصوتي... 0:0${recSec}`
                      : `Recording voice note... 0:0${recSec}`}
                  </span>
                  <div className="flex items-end gap-0.5 h-4">
                    {[6, 12, 16, 10, 14, 8, 15].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-rose-500 rounded-full animate-pulse"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={toggleVoiceRecording}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-current" />
                  {lang === "ar" ? "إيقاف وإرسال" : "Stop & Send"}
                </button>
              </div>
            ) : (
              <button
                disabled={aiTyping}
                onClick={() =>
                  handleSend(
                    lang === "ar" ? quickRepliesAr[step] : quickRepliesEn[step]
                  )
                }
                className="w-full text-start text-xs bg-teal-50 hover:bg-teal-100 disabled:opacity-50 text-teal-800 border border-teal-200 rounded-xl px-3 py-2 transition cursor-pointer flex items-center justify-between gap-2"
              >
                <span className="truncate">
                  ⚡{" "}
                  {lang === "ar"
                    ? `رد أحمد (${step + 1}/4): `
                    : `Ahmed Reply (${step + 1}/4): `}
                  {lang === "ar" ? quickRepliesAr[step] : quickRepliesEn[step]}
                </span>
                <span className="shrink-0 font-bold text-teal-700">
                  {lang === "ar" ? "إرسال" : "Send"}
                </span>
              </button>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                disabled={aiTyping}
                onClick={toggleVoiceRecording}
                title={
                  lang === "ar"
                    ? "محاكاة تسجيل صوتي (Voice Note)"
                    : "Simulate Voice Recording"
                }
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  recording
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 border-slate-200"
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={input}
                disabled={aiTyping || recording}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "اكتب إجابتك أو اضغط الميكروفون للتحدث صوتيًا..."
                    : "Type your reply or click the mic to speak..."
                }
                className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={aiTyping || recording}
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. HELP ME DO MY JOB MODAL (Simulated Approved-Only Retrieval — Text + Audio)
 *    Exact conversation flow from txt/use-case.md (Scene 2)
 * ========================================================================== */
interface HelpAssistantModalProps {
  lang: Lang;
  demoState: DemoState;
  onClose: () => void;
  onConfirmApplied: (cardId: string) => void;
}

export function HelpAssistantModal({
  lang,
  demoState,
  onClose,
  onConfirmApplied,
}: HelpAssistantModalProps) {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"ask" | "clarify" | "answered">("ask");
  const [matchedCard, setMatchedCard] = useState<KnowledgeCard | null>(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recSec, setRecSec] = useState(0);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "ai",
      text:
        lang === "ar"
          ? "مرحبًا خالد! أنا المساعد المعرفي المعتمد لإدارة العمليات. اكتب سؤالك أو تحدث صوتيًا وسأساعدك استنادًا إلى المعرفة المعتمدة فقط."
          : "Hi Khaled! I am the Operations Approved Knowledge Assistant. Type or speak your question and I'll guide you strictly from certified departmental memory.",
    },
  ]);

  const approvedCards = demoState.knowledgeCards.filter(
    (k) => k.status === "approved"
  );
  const pendingCards = demoState.knowledgeCards.filter(
    (k) => k.status === "pending_approval"
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping, phase]);

  useEffect(() => {
    return () => {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
    };
  }, []);

  const scriptedAsk =
    lang === "ar"
      ? "لدي طلب عميل يحتاج إلى 10 أجهزة، والنظام يظهر أن لدينا 24 جهازًا، ولكن لا أستطيع تنفيذ الطلب. ماذا أفعل؟"
      : "I have a customer order needing 10 devices, and the system shows 24 devices in stock, but I cannot fulfill the order. What should I do?";

  const scriptedClarify =
    lang === "ar"
      ? "يوجد 20 جهازًا محجوزًا، والمتاح فعليًا 4 أجهزة فقط."
      : "There are 20 reserved devices, and only 4 devices are actually available.";

  const handleQuery = (
    textOverride?: string,
    viaAudio = false,
    audioDuration?: string
  ) => {
    if (aiTyping) return;
    const q = (textOverride ?? input).trim();
    if (!q) return;
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", text: q, viaAudio, audioDuration },
    ]);
    setAiTyping(true);

    setTimeout(() => {
      setAiTyping(false);

      if (phase === "clarify" && matchedCard) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              lang === "ar"
                ? `وفقًا للمعرفة المعتمدة داخل إدارتك (${matchedCard.id}): اتبع الخطوات الأربع أدناه، ولا تقم بإلغاء الحجوزات السابقة دون موافقة.`
                : `According to approved knowledge in your department (${matchedCard.id}): follow the 4 certified steps below, and do not cancel prior reservations without approval.`,
          },
        ]);
        setPhase("answered");
        return;
      }

      const qLower = q.toLowerCase();
      const found =
        approvedCards.find(
          (c) =>
            c.keywords.some((kw) => qLower.includes(kw.toLowerCase())) ||
            qLower.includes(c.id.toLowerCase()) ||
            c.titleAr.toLowerCase().includes(qLower) ||
            c.titleEn.toLowerCase().includes(qLower)
        ) || (approvedCards.length === 1 ? approvedCards[0] : null);

      if (!found) {
        if (pendingCards.length > 0) {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text:
                lang === "ar"
                  ? `⚠️ توجد بطاقة معرفية (${pendingCards[0].id}) بانتظار اعتماد مدير العمليات (محمد الحربي). وفقًا لسياسة الحوكمة، لا يُسمح بتقديم المعلومات غير المعتمدة كإجراء رسمي حتى يتم اعتمادها.`
                  : `⚠️ Knowledge card (${pendingCards[0].id}) is pending Operations Manager approval. Governance policy blocks serving unapproved drafts as official procedures.`,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              text:
                lang === "ar"
                  ? "لا توجد معرفة معتمدة مطابقة لهذا الاستفسار في الذاكرة المؤسسية بعد. لا أقوم باختلاق إجراءات غير موثقة — استخلص خبرة أحمد أولًا ثم اعتمدها من محمد."
                  : "No approved knowledge matches this query yet. I never fabricate undocumented SOPs — capture Ahmed's expertise and have Mohammed approve it first.",
            },
          ]);
        }
        return;
      }

      setMatchedCard(found);
      if (found.id === "KN-001") {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              lang === "ar"
                ? "واجهت إدارتك هذه المشكلة سابقًا، وتوجد معرفة معتمدة لمعالجتها. تحقق أولًا من الكميات المحجوزة لطلبات العملاء الآخرين. كم عدد الأجهزة المحجوزة؟"
                : "Your department has faced this issue before, and approved knowledge exists to handle it. First check quantities reserved for other customer orders. How many devices are reserved?",
          },
        ]);
        setPhase("clarify");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            text:
              lang === "ar"
                ? `وجدتُ معرفة معتمدة مطابقة (${found.id}):`
                : `Found matching approved knowledge (${found.id}):`,
          },
        ]);
        setPhase("answered");
      }
    }, 650);
  };

  const toggleVoiceRecording = () => {
    if (aiTyping) return;
    const targetScript = phase === "ask" ? scriptedAsk : scriptedClarify;
    if (!recording) {
      setRecording(true);
      setRecSec(1);
      recTimerRef.current = setInterval(() => {
        setRecSec((s) => {
          if (s >= 3) {
            if (recTimerRef.current) clearInterval(recTimerRef.current);
            setRecording(false);
            handleQuery(targetScript, true, "0:03");
            return 0;
          }
          return s + 1;
        });
      }, 750);
    } else {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      const dur = `0:0${Math.max(1, recSec)}`;
      setRecording(false);
      setRecSec(0);
      handleQuery(targetScript, true, dur);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-sky-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === "ar"
                  ? "المساعد المعرفي — ساعدني في أداء عملي"
                  : "AI Knowledge Assistant — Help Me Do My Job"}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                {lang === "ar"
                  ? `يبحث حصريًا في المعرفة المعتمدة (${approvedCards.length} بطاقة)`
                  : `Searches strictly Approved Knowledge (${approvedCards.length} cards)`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200/70 text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-50/40">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                  m.role === "user"
                    ? "bg-sky-600 text-white rounded-ee-sm"
                    : "bg-white border border-slate-200 text-slate-800 rounded-es-sm"
                }`}
              >
                {m.viaAudio && (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-100 mb-1 pb-1 border-b border-sky-500/50">
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>
                      {lang === "ar"
                        ? `رسالة صوتية (${m.audioDuration || "0:03"})`
                        : `Voice Query (${m.audioDuration || "0:03"})`}
                    </span>
                  </div>
                )}
                {m.text}
              </div>
            </div>
          ))}

          {aiTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-es-sm px-4 py-3 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <span
                  className="w-2 h-2 rounded-full bg-sky-500 animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-sky-500 animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          )}

          {/* Cited Approved Knowledge Card */}
          {phase === "answered" && matchedCard && (
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-white p-4 shadow-md space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  ✓ {matchedCard.id} ({matchedCard.version}) —{" "}
                  {lang === "ar" ? "مصدر المعرفة المعتمد" : "Certified Source"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {lang === "ar"
                    ? `المساهم: ${matchedCard.ownerNameAr} • المعتمد: ${matchedCard.approverAr}`
                    : `Contributor: ${matchedCard.ownerNameEn} • Approver: ${matchedCard.approverEn}`}
                </span>
              </div>

              <div className="font-bold text-slate-900 text-sm">
                {lang === "ar" ? matchedCard.titleAr : matchedCard.titleEn}
              </div>

              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {(lang === "ar" ? matchedCard.stepsAr : matchedCard.stepsEn).map(
                  (s, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {s}
                    </li>
                  )
                )}
              </ol>

              <div className="text-xs bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2.5">
                <strong>
                  {lang === "ar" ? "⚠️ استثناء مهم:" : "⚠️ Strict Exception:"}
                </strong>{" "}
                {lang === "ar"
                  ? matchedCard.exceptionAr
                  : matchedCard.exceptionEn}
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="text-xs font-medium text-slate-600">
                  {lang === "ar"
                    ? "هل ساعدتك هذه المعرفة في معالجة المشكلة؟"
                    : "Did this knowledge help you resolve the problem?"}
                </span>
                <button
                  onClick={() => onConfirmApplied(matchedCard.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {lang === "ar"
                    ? "نعم — تم التنفيذ وتسجيل النتيجة"
                    : "Yes — Applied & Log Outcome"}
                </button>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input + Simulated Audio + Quick Prompts */}
        {phase !== "answered" && (
          <div className="p-4 border-t border-slate-200 bg-white space-y-2.5">
            {recording ? (
              <div className="flex items-center justify-between gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-bold text-rose-700">
                    {lang === "ar"
                      ? `جاري الاستماع... 0:0${recSec}`
                      : `Listening... 0:0${recSec}`}
                  </span>
                </div>
                <button
                  onClick={toggleVoiceRecording}
                  className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-current" />
                  {lang === "ar" ? "إيقاف وإرسال" : "Stop & Send"}
                </button>
              </div>
            ) : (
              <button
                disabled={aiTyping}
                onClick={() =>
                  handleQuery(phase === "ask" ? scriptedAsk : scriptedClarify)
                }
                className="w-full text-start text-xs bg-sky-50 hover:bg-sky-100 disabled:opacity-50 text-sky-800 border border-sky-200 rounded-xl px-3 py-2 transition cursor-pointer flex items-center justify-between gap-2"
              >
                <span className="truncate">
                  ⚡ {phase === "ask" ? scriptedAsk : scriptedClarify}
                </span>
                <span className="shrink-0 font-bold text-sky-700">
                  {lang === "ar" ? "إرسال" : "Send"}
                </span>
              </button>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                disabled={aiTyping}
                onClick={toggleVoiceRecording}
                title={
                  lang === "ar"
                    ? "محاكاة سؤال صوتي"
                    : "Simulate Voice Question"
                }
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 transition cursor-pointer"
              >
                <Mic className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={input}
                disabled={aiTyping || recording}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "ar"
                    ? "اكتب سؤالك التشغيلي أو اضغط الميكروفون..."
                    : "Type your operational question or click mic..."
                }
                className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                disabled={aiTyping || recording}
                className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. MANAGER DECK MODAL (Approvals, Risk & Transfer, Knowledge Foresight)
 * ========================================================================== */
interface ManagerDeckModalProps {
  lang: Lang;
  demoState: DemoState;
  initialTab?: "approvals" | "risk" | "foresight" | "audit";
  onClose: () => void;
  onApproveCard: (cardId: string) => void;
  onAssignTransfer: () => void;
  onVerifyTransfer: () => void;
  onLaunchInitiative: () => void;
}

export function ManagerDeckModal({
  lang,
  demoState,
  initialTab = "approvals",
  onClose,
  onApproveCard,
  onAssignTransfer,
  onVerifyTransfer,
  onLaunchInitiative,
}: ManagerDeckModalProps) {
  const [tab, setTab] = useState<"approvals" | "risk" | "foresight" | "audit">(
    initialTab
  );

  const pendingCards = demoState.knowledgeCards.filter(
    (k) => k.status === "pending_approval"
  );
  const kn001 = demoState.knowledgeCards.find((k) => k.id === "KN-001");

  const reservedCount = HISTORICAL_CASES.filter(
    (c) => c.reasonKey === "reserved_stock"
  ).length;
  const creditCount = HISTORICAL_CASES.filter(
    (c) => c.reasonKey === "credit_approval"
  ).length;
  const dataCount = HISTORICAL_CASES.filter(
    (c) => c.reasonKey === "order_data_error"
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              {lang === "ar"
                ? "لوحة المدير — حالة المعرفة ومستقبل إدارتي"
                : "Manager Command — Department Knowledge & Foresight"}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === "ar"
                ? "محمد الحربي • مدير العمليات • ALPHA Medical Solutions"
                : "Mohammed Al-Harbi • Operations Manager • ALPHA Medical Solutions"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 gap-1 overflow-x-auto">
          {[
            {
              id: "approvals" as const,
              ar: `الاعتمادات (${pendingCards.length})`,
              en: `Approvals (${pendingCards.length})`,
            },
            {
              id: "risk" as const,
              ar: "مخاطر الخبير الواحد والنقل",
              en: "Risk & Verified Transfer",
            },
            {
              id: "foresight" as const,
              ar: "القراءة المستقبلية (Foresight)",
              en: "Knowledge-Driven Foresight",
            },
            {
              id: "audit" as const,
              ar: "سجل الحوكمة",
              en: "Audit Trail",
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition cursor-pointer ${
                tab === t.id
                  ? "border-teal-600 text-teal-700 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {lang === "ar" ? t.ar : t.en}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "approvals" && (
            <div className="space-y-3">
              {pendingCards.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  {demoState.knowledgeCards.length === 0
                    ? lang === "ar"
                      ? "لا توجد بطاقات بانتظار الاعتماد بعد. اطلب من أحمد إضافة معرفة أولًا."
                      : "No cards pending approval yet. Have Ahmed capture knowledge first."
                    : lang === "ar"
                    ? "تم اعتماد جميع البطاقات المعرفية بنجاح ✓"
                    : "All submitted knowledge cards have been approved ✓"}
                </div>
              ) : (
                pendingCards.map((card) => (
                  <div
                    key={card.id}
                    className="rounded-2xl border border-amber-300 bg-amber-50/40 p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                        {card.id} •{" "}
                        {lang === "ar"
                          ? "بانتظار اعتمادك"
                          : "Awaiting Your Approval"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {lang === "ar" ? "المساهم:" : "Contributor:"}{" "}
                        <strong>
                          {lang === "ar" ? card.ownerNameAr : card.ownerNameEn}
                        </strong>
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900">
                      {lang === "ar" ? card.titleAr : card.titleEn}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      <div className="bg-white rounded-xl p-3 border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">
                          {lang === "ar" ? "السبب" : "Cause"}
                        </div>
                        {lang === "ar" ? card.causeAr : card.causeEn}
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200">
                        <div className="font-bold text-slate-500 mb-1">
                          {lang === "ar" ? "الحل" : "Solution"}
                        </div>
                        {lang === "ar" ? card.solutionAr : card.solutionEn}
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-amber-200">
                        <div className="font-bold text-amber-800 mb-1">
                          {lang === "ar" ? "الاستثناء" : "Exception"}
                        </div>
                        {lang === "ar" ? card.exceptionAr : card.exceptionEn}
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-emerald-200">
                        <div className="font-bold text-emerald-800 mb-1">
                          {lang === "ar" ? "الدرس المستفاد" : "Lesson Learned"}
                        </div>
                        {lang === "ar" ? card.lessonAr : card.lessonEn}
                      </div>
                    </div>
                    <button
                      onClick={() => onApproveCard(card.id)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {lang === "ar"
                        ? "اعتماد المعرفة وإضافتها للذاكرة المؤسسية (v1.0)"
                        : "Approve & Publish to Institutional Memory (v1.0)"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {tab === "risk" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {lang === "ar"
                      ? "قبل نقل المعرفة"
                      : "Before Verified Transfer"}
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {lang === "ar" ? "خبير واحد (أحمد)" : "1 Expert (Ahmed)"}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {lang === "ar"
                      ? "اعتماد مرتفع على شخص واحد — مخاطر فقدان المعرفة مرتفعة"
                      : "High single-person dependency — high knowledge loss risk"}
                  </div>
                </div>
                <div
                  className={`rounded-2xl border p-4 ${
                    demoState.transferStatus === "verified"
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {lang === "ar" ? "الحالة الحالية" : "Current Live State"}
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      demoState.transferStatus === "verified"
                        ? "text-emerald-700"
                        : "text-slate-700"
                    }`}
                  >
                    {demoState.transferStatus === "verified"
                      ? lang === "ar"
                        ? "موظفان مؤهلان (أحمد وخالد) ✓"
                        : "2 Qualified Staff (Ahmed & Khaled) ✓"
                      : demoState.transferStatus === "test_passed"
                      ? lang === "ar"
                        ? "خالد اجتاز الاختبار — بانتظار تأكيدك"
                        : "Khaled Passed — Ready to Certify"
                      : demoState.transferStatus === "assigned"
                      ? lang === "ar"
                        ? "تم تكليف خالد بمسار النقل"
                        : "Transfer Assigned to Khaled"
                      : lang === "ar"
                      ? "لم يتم التحقق من بديل بعد"
                      : "No Verified Backup Yet"}
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    {demoState.transferStatus === "verified"
                      ? lang === "ar"
                        ? "تحولت حلقة أحمد في الخريطة ثلاثية الأبعاد للأخضر — انخفاض المخاطر!"
                        : "Ahmed's 3D floor ring turned Emerald Green — risk lowered!"
                      : lang === "ar"
                      ? "توصية المنصة: تكليف خالد الغامدي والتحقق العملي من قدرته."
                      : "Recommendation: Assign Khaled and verify practical execution."}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 bg-white flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 text-sm">
                    {lang === "ar"
                      ? "مسار التحقق من نقل المعرفة الحرجة (KN-001)"
                      : "Verified Knowledge Transfer Workflow (KN-001)"}
                  </div>
                  <div className="text-xs text-slate-500">
                    {lang === "ar"
                      ? "لا يُكتفى بالاختبار النظري — يتطلب تنفيذ حالة تطبيقية واعتماد المدير."
                      : "Theory alone isn't enough — requires practical scenario execution + manager sign-off."}
                  </div>
                </div>

                {demoState.transferStatus === "not_started" && (
                  <button
                    disabled={!kn001 || kn001.status !== "approved"}
                    onClick={onAssignTransfer}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    {lang === "ar"
                      ? "تكليف خالد باكتساب المعرفة"
                      : "Assign Transfer to Khaled"}
                  </button>
                )}

                {demoState.transferStatus === "assigned" && (
                  <span className="text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl">
                    {lang === "ar"
                      ? "بانتظار إكمال خالد للسيناريو التطبيقي (بدّل لحساب خالد)"
                      : "Waiting for Khaled to complete scenario (Switch to Khaled)"}
                  </span>
                )}

                {demoState.transferStatus === "test_passed" && (
                  <button
                    onClick={onVerifyTransfer}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === "ar"
                      ? "اعتماد الجاهزية العملية لخالد وتحديث الخريطة"
                      : "Certify Khaled's Readiness & Update 3D Map"}
                  </button>
                )}

                {demoState.transferStatus === "verified" && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {lang === "ar"
                      ? "تم التحقق وتقليل المخاطر ✓"
                      : "Verified & Secured ✓"}
                  </span>
                )}
              </div>
            </div>
          )}

          {tab === "foresight" && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-teal-950 text-white p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    {lang === "ar"
                      ? "تحليل 6 حالات تاريخية مسجلة في الذاكرة المؤسسية"
                      : "Analysis of 6 Recorded Institutional Memory Cases"}
                  </span>
                  <span className="text-2xl font-black text-amber-400">67%</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {lang === "ar"
                    ? "67% من حالات تأخر الطلبات المسجلة (4 من 6 حالات) مرتبطة بالكميات المحجوزة دون تحقق مسبق قبل تأكيد موعد التسليم."
                    : "67% of recorded order delays (4 of 6 cases) are caused by reserved stock not being checked before confirming delivery dates."}
                </p>

                <div className="space-y-2 pt-2">
                  {[
                    {
                      labelAr: "كميات محجوزة",
                      labelEn: "Reserved Stock",
                      count: reservedCount,
                      pct: 67,
                      color: "bg-amber-400",
                    },
                    {
                      labelAr: "تأخر الموافقة الائتمانية",
                      labelEn: "Credit Approval Delay",
                      count: creditCount,
                      pct: 17,
                      color: "bg-sky-400",
                    },
                    {
                      labelAr: "خطأ في بيانات الطلب",
                      labelEn: "Order Data Error",
                      count: dataCount,
                      pct: 17,
                      color: "bg-slate-400",
                    },
                  ].map((bar) => (
                    <div key={bar.labelEn} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{lang === "ar" ? bar.labelAr : bar.labelEn}</span>
                        <span className="font-bold">
                          {bar.count} ({bar.pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${bar.color}`}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    {lang === "ar"
                      ? "الخطر المستقبلي المحتمل"
                      : "Projected Operational Risk"}
                  </div>
                  <p className="text-amber-950 leading-relaxed">
                    {lang === "ar"
                      ? "استمرار تأخر طلبات المستشفيات إذا تم تأكيد مواعيد التسليم بناءً على إجمالي المخزون بدلًا من المتاح الفعلي."
                      : "Recurring hospital delays if delivery dates continue to be promised based on total ERP stock instead of unreserved stock."}
                  </p>
                </div>
                <div className="rounded-xl border border-teal-200 bg-teal-50 p-3.5 space-y-1">
                  <div className="font-bold text-teal-900 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-teal-600" />
                    {lang === "ar"
                      ? "فرصة الابتكار والتحسين"
                      : "Innovation & Process Opportunity"}
                  </div>
                  <p className="text-teal-950 leading-relaxed">
                    {lang === "ar"
                      ? "إضافة خطوة تحقق إلزامي من الكميات غير المحجوزة قبل تأكيد الطلب، مع تنبيه مبكر من نظام المخزون."
                      : "Add a mandatory unreserved-stock verification gate before order confirmation, plus early ERP reservation alerts."}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 bg-white">
                <div className="text-xs">
                  <div className="font-bold text-slate-900 text-sm">
                    {lang === "ar"
                      ? "الإجراء المقترح للمدير"
                      : "Recommended Executive Action"}
                  </div>
                  <div className="text-slate-600 mt-0.5">
                    {lang === "ar"
                      ? "تكليف أحمد وخالد بتطوير إجراء التحقق المسبق واختباره وقياس الأثر خلال الشهر القادم."
                      : "Assign Ahmed & Khaled to pilot the pre-confirmation check and measure delay reduction next month."}
                  </div>
                </div>
                {demoState.initiatives.length === 0 ? (
                  <button
                    onClick={onLaunchInitiative}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    {lang === "ar"
                      ? "تحويل إلى مبادرة تحسين ✓"
                      : "Launch Improvement Initiative ✓"}
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                    ✓{" "}
                    {lang === "ar"
                      ? "مبادرة نشطة (أحمد وخالد)"
                      : "Initiative Active (Ahmed & Khaled)"}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400">
                {lang === "ar"
                  ? "ملاحظة: هذه قراءة استشرافية مبنية على 6 حالات افتراضية مسجلة لدعم القرار وليست توقعًا إحصائيًا مؤكدًا."
                  : "Note: Foresight insights are grounded in the 6 recorded demo cases for decision support, not guaranteed statistical forecasts."}
              </p>
            </div>
          )}

          {tab === "audit" && (
            <div className="space-y-2">
              {demoState.auditLog.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-slate-200 p-3 flex items-start gap-3 text-xs bg-slate-50/70"
                >
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-800">
                      {lang === "ar" ? entry.actorAr : entry.actorEn}{" "}
                      <span className="font-normal text-slate-400">
                        • {entry.timestamp}
                      </span>
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      {lang === "ar" ? entry.actionAr : entry.actionEn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. PRACTICAL TRANSFER TEST MODAL (Khaled)
 * ========================================================================== */
export function TransferTestModal({
  lang,
  onClose,
  onPassTest,
}: {
  lang: Lang;
  onClose: () => void;
  onPassTest: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const options = [
    {
      ar: "إلغاء حجوزات العملاء الآخرين فورًا لتنفيذ طلب المستشفى الجديد بالكامل.",
      en: "Cancel other customers' reservations immediately to fulfill the new hospital order.",
      correct: false,
    },
    {
      ar: "التحقق من الكميات غير المحجوزة والشحنات القادمة، التنسيق مع مسؤول المخزون، وعرض التسليم الجزئي بعد الموافقة دون إلغاء أي حجز سابق.",
      en: "Check unreserved stock & incoming shipments, coordinate with inventory lead, and offer approved partial delivery without cancelling existing reservations.",
      correct: true,
    },
    {
      ar: "تأكيد موعد التسليم بناءً على إجمالي المخزون الظاهر في النظام (15 جهازًا).",
      en: "Confirm delivery date immediately based on the total ERP stock figure (15 devices).",
      correct: false,
    },
  ];

  const handleSubmit = () => {
    if (selected === null) return;
    if (options[selected].correct) {
      onPassTest();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-emerald-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {lang === "ar"
                ? "اختبار التطبيق العملي لنقل المعرفة (KN-001)"
                : "Practical Knowledge Transfer Scenario (KN-001)"}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === "ar"
                ? "المكلف: خالد الغامدي"
                : "Assignee: Khaled Al-Ghamdi"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 text-sm text-slate-800 leading-relaxed">
            {lang === "ar"
              ? "حالة تطبيقية: استلمت طلبًا عاجلًا من مستشفى لـ 8 أجهزة. يظهر النظام 15 جهازًا بالمخزون، لكن 12 منها محجوزة لعملاء آخرين. ما الإجراء الصحيح المعتمد؟"
              : "Practical Case: A hospital requests 8 devices urgently. ERP shows 15 in stock, but 12 are reserved for other hospitals. What is the certified operational procedure?"}
          </div>

          <div className="space-y-2">
            {options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelected(idx);
                  setError(false);
                }}
                className={`w-full text-start p-3 rounded-xl border text-xs leading-relaxed transition cursor-pointer ${
                  selected === idx
                    ? "border-teal-600 bg-teal-50 font-semibold text-teal-950"
                    : "border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                {lang === "ar" ? opt.ar : opt.en}
              </button>
            ))}
          </div>

          {error && (
            <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-2.5">
              {lang === "ar"
                ? "إجابة غير مطابقة للمعرفة المعتمدة KN-001 — تذكر قاعدة عدم إلغاء الحجوزات السابقة دون موافقة."
                : "Does not match approved KN-001 — remember never to cancel prior reservations without approval."}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-sm transition cursor-pointer"
          >
            {lang === "ar"
              ? "إرسال الإجابة لإشراف المدير"
              : "Submit Practical Case for Manager Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5. EMPLOYEE KNOWLEDGE RECOGNITION MODAL (Ahmed)
 * ========================================================================== */
export function RecognitionModal({
  lang,
  demoState,
  onClose,
}: {
  lang: Lang;
  demoState: DemoState;
  onClose: () => void;
}) {
  const approvedCount = demoState.knowledgeCards.filter(
    (k) => k.ownerId === "ahmed" && k.status === "approved"
  ).length;
  const resolvedCount = demoState.orderSO10482Resolved ? 1 : 0;
  const certifiedCount = demoState.transferStatus === "verified" ? 1 : 0;
  const initiativesCount = demoState.initiatives.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 bg-gradient-to-br from-amber-500 to-teal-600 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {lang === "ar" ? "أحمد القحطاني" : "Ahmed Al-Qahtani"}
              </h3>
              <p className="text-xs text-white/90">
                {lang === "ar"
                  ? "أثرك المعرفي الموثّق في ALPHA Medical Solutions"
                  : "Your Verified Knowledge Impact at ALPHA Medical Solutions"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                val: approvedCount,
                ar: "مساهمة معرفية معتمدة",
                en: "Approved Knowledge Cards",
              },
              {
                val: resolvedCount,
                ar: "مشكلة حُلّت أثناء غيابك",
                en: "Cases Resolved While Away",
              },
              {
                val: certifiedCount,
                ar: "موظف تم تأهيله بخبرتك",
                en: "Colleagues Certified",
              },
              {
                val: initiativesCount,
                ar: "فرصة تحسين مكتشفة",
                en: "Improvement Initiatives",
              },
            ].map((stat) => (
              <div
                key={stat.en}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center"
              >
                <div className="text-3xl font-black text-teal-700">
                  {stat.val}
                </div>
                <div className="text-xs text-slate-600 font-medium mt-1">
                  {lang === "ar" ? stat.ar : stat.en}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-950 leading-relaxed">
            {lang === "ar"
              ? "ساهمت خبرتك في استمرارية تنفيذ طلبات المستشفيات، وتطوير مهارات زميلك خالد، واكتشاف فرصة تحسين آلية تأكيد مواعيد التسليم. مشاركة المعرفة تجعل أثر خبرتك مرئيًا وقابلًا للتقدير المهني."
              : "Your expertise kept hospital orders moving while you were away, upskilled Khaled, and uncovered a systemic improvement opportunity. Sharing knowledge makes your impact visible and recognized."}
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition cursor-pointer"
          >
            {lang === "ar" ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
