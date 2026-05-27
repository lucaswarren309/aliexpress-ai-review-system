"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [result, setResult] = useState("");

  const handleAudit = () => {
    if (!title.trim() && !detail.trim()) {
      alert("请先输入产品标题或产品详情");
      return;
    }

    setResult(`
综合评分：82 / 100

SEO评分：85
品牌感评分：78
转化逻辑评分：83
可读性评分：80

主要问题：
1. 标题存在一定参数堆砌，平台感较重。
2. 产品详情偏功能罗列，缺少用户购买理由。
3. 缺少欧美用户更容易理解的专业表达。
4. 临床/使用场景表达不足。

优化建议：
1. 标题建议采用：核心产品词 + 核心功能 + 应用场景。
2. 减少 HOT SALE、BEST QUALITY、CHEAP 等低端营销词。
3. 详情页增加：适用人群、使用场景、核心优势。
4. 增加 professional、clinical、ergonomic、precision 等表达。

推荐优化标题：
Professional Dental Handpiece for Clinical Treatment and Daily Practice
    `);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "40px", fontFamily: "Arial" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", background: "#fff", borderRadius: "20px", padding: "40px" }}>
        <h1>速卖通 AI 审核系统</h1>
        <p style={{ color: "#666" }}>AliExpress Operation AI Audit System</p>

        <div style={{ marginTop: "30px" }}>
          <label>产品标题</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入产品标题"
            style={{ width: "100%", padding: "14px", marginTop: "10px", borderRadius: "10px", border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>产品详情</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="请输入产品详情、卖点或参数"
            rows={8}
            style={{ width: "100%", padding: "14px", marginTop: "10px", borderRadius: "10px", border: "1px solid #ddd" }}
          />
        </div>

        <button
          onClick={handleAudit}
          style={{ marginTop: "25px", background: "#111", color: "#fff", padding: "14px 28px", borderRadius: "12px", border: "none", cursor: "pointer", fontSize: "16px" }}
        >
          开始 AI 审核
        </button>

        {result && (
          <div style={{ marginTop: "40px", padding: "30px", background: "#fafafa", borderRadius: "16px", whiteSpace: "pre-line", lineHeight: "1.8" }}>
            <h2>审核结果</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
