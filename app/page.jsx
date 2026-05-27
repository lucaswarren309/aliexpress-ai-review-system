"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAudit = async () => {
    if (!title && !detail) {
      alert("请输入产品内容");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          detail,
        }),
      });

      const data = await response.json();

      setResult(data.result);
    } catch (error) {
      setResult("AI审核失败");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <h1>速卖通 AI 审核系统</h1>

        <p style={{ color: "#666" }}>
          AliExpress Operation AI Audit System
        </p>

        <div style={{ marginTop: "30px" }}>
          <label>产品标题</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入产品标题"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>产品详情</label>

          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="请输入产品详情"
            rows={8}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd",
            }}
          />
        </div>

        <button
          onClick={handleAudit}
          style={{
            marginTop: "25px",
            background: "#111",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "AI审核中..." : "开始 AI 审核"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "40px",
              padding: "30px",
              background: "#fafafa",
              borderRadius: "16px",
              whiteSpace: "pre-line",
              lineHeight: "1.8",
            }}
          >
            <h2>审核结果</h2>

            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
