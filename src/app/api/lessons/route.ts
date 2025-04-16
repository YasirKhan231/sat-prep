import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function GET() {
  try {
    // Generate a lesson using GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert SAT/ACT tutor. Create a lesson that includes:
1. A clear title
2. A concise explanation of the concept
3. 5 multiple-choice questions with:
   - Clear question text
   - 4 answer options
   - The correct answer index (0-3)
   - A detailed explanation for why the answer is correct
4. A difficulty rating (1-5)

Format the response as JSON with the following structure:
{
  "title": "Lesson Title",
  "content": "Lesson content...",
  "difficulty": 3,
  "questions": [
    {
      "id": "1",
      "text": "Question text...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation..."
    }
  ]
}`,
        },
        {
          role: "user",
          content: "Create a lesson about SAT Math problem-solving strategies.",
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const lessonContent = completion.choices[0].message.content;
    if (!lessonContent) {
      throw new Error("Failed to generate lesson content");
    }

    // Parse the JSON response
    const lesson = JSON.parse(lessonContent);

    return NextResponse.json({
      lessons: [lesson],
    });
  } catch (error) {
    console.error("Error generating lesson:", error);
    return NextResponse.json(
      { error: "Failed to generate lesson" },
      { status: 500 }
    );
  }
}
