import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req) {

  try {

    const body = await req.json();

    const prompt = `
你是一名专业的 AliExpress 速卖通运营审核专家。

请审核以下产品内容：

【产品标题】
${body.title}

【产品详情】
${body.description}

请输出：

1. 综合评分（100分）
2. SEO评分
3. 品牌感评分
4. 转化逻辑评分
5. 可读性评分
6. 主要问题
7. 优化建议
8. 推荐优化标题

要求：
- 专业
- 欧美品牌风格
- Shopify 独立站风格
- 避免中国跨境风
- 中文输出
`;

    const completion = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return Response.json({
      result: completion.choices[0].message.content,
    });

  } catch (error) {

    return Response.json({
      result: "AI审核失败：" + error.message,
    });

  }

}
