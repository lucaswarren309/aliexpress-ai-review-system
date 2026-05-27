"use client";

import { useState } from "react";

export default function Home() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAudit() {

    setLoading(true);

    const response = await fetch("/api/audit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    const data = await response.json();

    setResult(data.result || data.error);

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >

      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        AliExpress Operation AI Audit System
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          产品标题
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="请输入产品标题"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
          产品详情
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="请输入产品详情"
          rows={10}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />
      </div>

      <button
        onClick={handleAudit}
        disabled={loading}
        style={{
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
            background: "#f7f7f7",
            borderRadius: "20px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.8",
          }}
        >
          <h2>审核结果</h2>

          <div>{result}</div>
        </div>
      )}

    </div>
  );
}
