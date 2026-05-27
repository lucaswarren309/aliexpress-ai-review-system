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

请严格按照以下结构输出：

# 1. 综合评分
给出 100 分制评分。

# 2. SEO评分
分析标题关键词、搜索意图、关键词堆砌问题。

# 3. 品牌感评分
判断是否有欧美专业品牌感，是否像中国跨境风。

# 4. 转化逻辑评分
分析是否能吸引用户点击、理解、下单。

# 5. 可读性评分
分析标题和详情是否清晰、专业、易理解。

# 6. 主要问题
列出具体问题。

# 7. 优化建议
给出可执行修改建议。

# 8. 推荐优化标题
生成 1 个更适合 AliExpress / 独立站 / 欧美市场的英文标题。

审核标准：
- 专业
- 欧美市场表达
- 避免 AliExpress 低端风格
- 避免关键词堆砌
- 避免 HOT SALE / CHEAP / BEST QUALITY
- 强调用户搜索习惯
- 强调转化逻辑
- 用中文分析
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
