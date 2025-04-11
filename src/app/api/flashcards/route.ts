import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const { topic, difficulty, numCards } = await request.json()

    const prompt = `Generate ${numCards} high-quality SAT study flashcards on "${topic}" (${difficulty} level).
Format as JSON array with objects containing:
- "front": question/prompt
- "back": detailed answer
- "explanation": step-by-step reasoning
- "tags": relevant SAT topics

Example:
[
  {
    "front": "Solve for x: 2x + 5 = 15",
    "back": "x = 5",
    "explanation": "1. Subtract 5 from both sides...",
    "tags": ["algebra", "equations"]
  }
]`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are an SAT expert. Return ONLY valid JSON arrays without any additional text." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      throw new Error('No content received from OpenAI')
    }
    const parsed = JSON.parse(content)
    const cards = Array.isArray(parsed) ? parsed : parsed.cards || []

    return NextResponse.json({ 
      success: true,
      cards: cards.map((card: any) => ({
        ...card,
        category: topic,
        created: new Date().toISOString(),
        lastReviewed: null,
        nextReview: new Date().toISOString(),
        srsLevel: 0
      }))
    })

  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || "Failed to generate flashcards"
      },
      { status: 500 }
    )
  }
}