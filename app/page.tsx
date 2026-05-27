import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, ClipboardCheck, AlertTriangle, CheckCircle2, BarChart3 } from "lucide-react";

export default function AliExpressAIReviewSystem() {
  const [form, setForm] = useState({
    operator: "",
    category: "Dental Handpiece",
    market: "Europe / United States",
    title: "",
    keywords: "",
    description: "",
  });

  const [result, setResult] = useState(null);

  const review = () => {
    const title = form.title.trim();
    const desc = form.description.trim();
    const keywords = form.keywords
      .split(/[,.，、\n]/)
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    let seo = 80;
    let readability = 80;
    let brand = 80;
    let conversion = 80;
    const problems = [];
    const suggestions = [];

    if (!title) {
      seo -= 40;
      readability -= 40;
      problems.push("标题为空，无法审核。");
    }

    if (title.length < 50) {
      seo -= 10;
      suggestions.push("标题偏短，建议加入核心产品词、功能词和使用场景。");
    }

    if (title.length > 130) {
      readability -= 20;
      brand -= 15;
      problems.push("标题过长，容易像平台堆词，不利于专业感和可读性。");
    }

    const spamWords = ["hot sale", "best quality", "cheap", "2025 new", "factory price", "free shipping"];
    const spamHit = spamWords.filter((w) => title.toLowerCase().includes(w) || desc.toLowerCase().includes(w));
    if (spamHit.length) {
      brand -= 25;
      conversion -= 15;
      problems.push(`出现低端营销词：${spamHit.join(", ")}。`);
      suggestions.push("删除夸张促销词，改用专业、临床、用途导向表达。");
    }

    const parameterPattern = /(1:5|1:1|1:4\.2|rpm|led|e-type|fiber optic|ceramic bearing)/gi;
    const parameterCount = (title.match(parameterPattern) || []).length;
    if (parameterCount >= 4) {
      readability -= 15;
      brand -= 15;
      problems.push("标题参数过多，存在AliExpress风格风险。");
      suggestions.push("保留1-2个关键参数，其余放到详情页规格模块。");
    }

    const keywordHits = keywords.filter((k) => title.toLowerCase().includes(k)).length;
    if (keywords.length && keywordHits === 0) {
      seo -= 20;
      problems.push("标题没有覆盖提交的核心关键词。");
    }

    if (desc.length < 80) {
      conversion -= 20;
      suggestions.push("详情描述偏短，建议补充临床用途、核心卖点和适用人群。");
    }

    if (desc.length > 800) {
      readability -= 10;
      suggestions.push("详情描述较长，建议拆分为短段落和要点列表。");
    }

    const clinicalWords = ["clinical", "dental", "practice", "treatment", "ergonomic", "precision", "reliable"];
    const clinicalHit = clinicalWords.some((w) => (title + " " + desc).toLowerCase().includes(w));
    if (!clinicalHit) {
      brand -= 15;
      conversion -= 10;
      suggestions.push("建议加入临床价值表达，例如 precision、ergonomic、clinical workflow、daily practice。");
    }

    const clamp = (n) => Math.max(0, Math.min(100, Math.round(n)));
    seo = clamp(seo);
    readability = clamp(readability);
    brand = clamp(brand);
    conversion = clamp(conversion);
    const total = clamp((seo + readability + brand + conversion) / 4);

    const status = total >= 85 ? "通过" : total >= 70 ? "需优化" : "退回修改";

    const optimizedTitle = buildOptimizedTitle(form.category, keywords, title);

    setResult({
      total,
      status,
      seo,
      readability,
      brand,
      conversion,
      problems: problems.length ? problems : ["未发现明显基础问题。"],
      suggestions: suggestions.length ? suggestions : ["整体合格，可进入人工抽检。"],
      optimizedTitle,
      aiComment: generateComment(total),
    });
  };

  const records = useMemo(() => {
    if (!result) return [];
    return [
      { label: "SEO", value: result.seo },
      { label: "可读性", value: result.readability },
      { label: "品牌感", value: result.brand },
      { label: "转化逻辑", value: result.conversion },
    ];
  }, [result]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <ClipboardCheck className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">速卖通运营 AI 审核系统 MVP</h1>
              <p className="text-slate-600">用于标题、详情页、SEO、品牌感与转化逻辑的标准化初审。</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 text-lg font-medium">
                <Search className="h-5 w-5" />
                员工提交内容
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">运营人员</label>
                  <Input value={form.operator} onChange={(e) => setForm({ ...form, operator: e.target.value })} placeholder="例如：小王" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">产品类目</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">目标市场</label>
                <Input value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">产品标题</label>
                <Textarea rows={3} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="粘贴速卖通产品标题" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">核心关键词</label>
                <Input value={form.keywords} onChange={(e) => setForm({ ...form, keywords: e.target.value })} placeholder="例如：contra angle, dental handpiece, fiber optic" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">产品详情/卖点</label>
                <Textarea rows={8} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="粘贴详情页文案、卖点或参数" />
              </div>

              <Button onClick={review} className="w-full rounded-2xl py-6 text-base">
                开始AI审核
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardContent className="space-y-5 p-6">
              <div className="flex items-center gap-2 text-lg font-medium">
                <BarChart3 className="h-5 w-5" />
                审核结果
              </div>

              {!result ? (
                <div className="rounded-2xl border border-dashed p-8 text-center text-slate-500">
                  提交内容后，这里会显示评分、问题、建议和优化标题。
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm">
                    <div>
                      <div className="text-sm text-slate-500">综合评分</div>
                      <div className="text-5xl font-semibold">{result.total}</div>
                    </div>
                    <Badge className="rounded-full px-4 py-2 text-sm" variant={result.status === "通过" ? "default" : result.status === "需优化" ? "secondary" : "destructive"}>
                      {result.status}
                    </Badge>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {records.map((r) => (
                      <div key={r.label} className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="mb-2 flex justify-between text-sm">
                          <span>{r.label}</span>
                          <span className="font-medium">{r.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-slate-900" style={{ width: `${r.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <section className="space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <AlertTriangle className="h-5 w-5" />
                      主要问题
                    </div>
                    <ul className="space-y-2">
                      {result.problems.map((p, i) => (
                        <li key={i} className="rounded-xl bg-white p-3 text-sm shadow-sm">{p}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-5 w-5" />
                      优化建议
                    </div>
                    <ul className="space-y-2">
                      {result.suggestions.map((p, i) => (
                        <li key={i} className="rounded-xl bg-white p-3 text-sm shadow-sm">{p}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="mb-2 font-medium">推荐优化标题</div>
                    <p className="text-sm leading-6 text-slate-700">{result.optimizedTitle}</p>
                  </section>

                  <section className="rounded-2xl bg-slate-900 p-4 text-white shadow-sm">
                    <div className="mb-2 font-medium">主管审核提示</div>
                    <p className="text-sm leading-6 text-slate-200">{result.aiComment}</p>
                  </section>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function buildOptimizedTitle(category, keywords, originalTitle) {
  const primary = keywords[0] || extractPrimary(originalTitle) || category;
  const cleanCategory = category || "Professional Dental Product";

  if (cleanCategory.toLowerCase().includes("handpiece") || primary.includes("handpiece")) {
    return "Fiber Optic Contra Angle Handpiece for Professional Dental Clinical Use";
  }

  if (cleanCategory.toLowerCase().includes("endo")) {
    return "Professional Endodontic Treatment Device for Efficient Root Canal Workflow";
  }

  return `${capitalize(primary)} for Professional Dental Clinical Applications`;
}

function extractPrimary(title) {
  if (!title) return "";
  const words = title
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3);
  return words.slice(0, 4).join(" ");
}

function capitalize(text) {
  return text
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function generateComment(score) {
  if (score >= 85) return "基础质量较好，可进入主管抽检。建议重点检查图片表现和产品差异化卖点。";
  if (score >= 70) return "内容具备基础可用性，但仍存在风格或转化问题。建议运营人员按AI建议修改后再次提交。";
  return "不建议直接上线。该内容存在明显质量问题，应退回运营人员重新优化，避免影响店铺专业度与转化。";
}
