export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "40px",
      fontFamily: "Arial"
    }}>
      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
      }}>
        <h1 style={{
          fontSize: "36px",
          marginBottom: "10px"
        }}>
          速卖通 AI 审核系统
        </h1>

        <p style={{
          color: "#666",
          marginBottom: "40px"
        }}>
          AliExpress Operation AI Audit System
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label>产品标题</label>

          <input
            type="text"
            placeholder="请输入产品标题"
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>产品详情</label>

          <textarea
            placeholder="请输入产品详情"
            rows={8}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />
        </div>

        <button
          style={{
            background: "#111",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          开始 AI 审核
        </button>

        <div style={{
          marginTop: "40px",
          padding: "30px",
          background: "#fafafa",
          borderRadius: "16px"
        }}>
          <h2>审核结果示例</h2>

          <p>SEO评分：85</p>

          <p>品牌感：80</p>

          <p>转化逻辑：88</p>

          <p>问题：</p>

          <ul>
            <li>标题参数偏多</li>
            <li>缺少欧美专业表达</li>
          </ul>

          <p>优化建议：</p>

          <ul>
            <li>减少参数堆砌</li>
            <li>增加 clinical / ergonomic 等表达</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
