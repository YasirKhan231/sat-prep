import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, mode, imageBase64 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Default system message for general SAT/ACT help
    let systemMessage = {
      role: "system",
      content:
        "You are an expert SAT/ACT tutor. Provide accurate and helpful answers to student questions about test preparation, content, strategies, and practice.",
    };

    // Adjust system message based on the mode
    if (mode === "math") {
      systemMessage.content =
        "You are an expert math tutor for SAT/ACT preparation. Provide clear, step-by-step solutions to math problems. Break down complex concepts, show all work, and explain your reasoning for each step.";
    } else if (mode === "essay") {
      systemMessage.content =
        "You are an expert writing tutor for SAT/ACT essay preparation. Analyze the provided essay and give feedback on structure, grammar, style, content, and argumentation. Be specific and constructive.";
    } else if (mode === "image") {
      systemMessage.content =
        "You are an expert tutor for SAT/ACT preparation. The student has uploaded an image of their work. Analyze the content, identify any errors, and provide helpful feedback.";
    }

    // Handle image mode differently using Vision API
    if (mode === "image" && imageBase64) {
      // Use GPT-4 Vision for image analysis
      const completion = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 1000,
        messages: [
          {
            role: "system",
            content: systemMessage.content,
          },
          {
            role: "user",
            content: [
              { type: "text", text: messages[messages.length - 1].content },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`,
                },
              },
            ],
          },
        ],
      });

      const responseMessage = completion.choices[0].message.content;
      return NextResponse.json({ response: responseMessage });
    }

    // Regular text-based chat
    // Create formatted messages for OpenAI including our system message
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Using GPT-4 for high-quality responses
      messages: formattedMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extract the response
    const responseMessage = completion.choices[0].message.content;

    return NextResponse.json({ response: responseMessage });
  } catch (error: any) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
