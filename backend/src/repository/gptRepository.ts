import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI();

async function getChatCompletion(prompt: string): Promise<any> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}

export default getChatCompletion;
