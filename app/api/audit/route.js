export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
你是一名专业的 AliExpress 速卖通运营审核专家。

请审核以下产品：

【产品标题】
${body.title}

【产品详情】
${body.description}

请输出：

1. 综合评分（100分）
2. SEO评分
3. 转化评分
4. 品牌感评分
5. 存在的问题
6. 优化建议
7. 推荐优化标题

请用中文输出。
`;

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    return Response.json({
      result: data.choices[0].message.content,
    });
  } catch (error) {
    return Response.json({
      result: "AI审核失败",
      error: error.message,
    });
  }
}
