import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
你是一名专业速卖通运营审核专家。

请审核以下产品内容：

标题：
${body.title}

详情：
${body.detail}

请输出：

1. SEO评分
2. 品牌感评分
3. 转化逻辑评分
4. 存在问题
5. 优化建议
6. 推荐优化标题

要求：
- 专业
- 欧美风格
- 国际品牌感
- 不要中国跨境风
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
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
