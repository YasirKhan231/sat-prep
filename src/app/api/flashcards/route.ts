import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { db, auth } from '@/lib/firebase'; // Import your Firebase config and auth
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { jsonrepair } from 'jsonrepair';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { topic, difficulty, numCards , userId } = await request.json();

    if (!topic || !difficulty || !numCards) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the authenticated user
   

console.log(`User ID: ${userId}`); // Debugging line
    const prompt = `Generate ${numCards} high-quality study flashcards on the topic "${topic}" at ${difficulty} difficulty level. 
Format each card as a JSON object with "front" (question) and "back" (detailed answer/solution) properties.
Return as a JSON array of objects. Provide challenging questions that test actual understanding.
Include detailed explanations and steps in the answers. For math questions, include the complete solution process.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert tutor specializing in creating high-quality educational flashcards.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { success: false, error: 'No content generated from OpenAI' },
        { status: 500 }
      );
    }

    // Parse the generated cards
    let generatedCards;
    try {
      const jsonMatch =
        content.match(/```json\n([\s\S]*?)\n```/) ||
        content.match(/```\n([\s\S]*?)\n```/) || [null, content];
      const jsonContent = jsonMatch[1];
      generatedCards = JSON.parse(jsonrepair(jsonContent));

    } catch (parseError) {
      console.error('Error parsing generated cards:', parseError);
      return NextResponse.json(
        { success: false, error: 'Failed to parse the generated flashcards' },
        { status: 500 }
      );
    }

    // Add metadata and store in Firestore
    const now = new Date().toISOString();
    const flashcardsCollection = collection(db, 'users', userId, 'flashcards');
    
    const cardsWithMetadata = await Promise.all(
      generatedCards.map(async (card: any) => {
        const cardId = userId + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
        const cardData = {
          ...card,
          id: cardId,
          userId,
          category: topic,
          difficulty,
          created: now,
          lastReviewed: null,
          nextReview: now,
          srsLevel: 0,
          tags: [topic.toLowerCase().replace(/\s+/g, '-')],
        };

        await setDoc(doc(flashcardsCollection, cardId), cardData);
        return cardData;
      })
    );

    // Create a deck document in user's subcollection
    const deckId = userId + '_' + Date.now();
    const deckData = {
      id: deckId,
      title: `${topic} Study Deck`,
      description: `Flashcards for ${topic} at ${difficulty} level`,
      created: now,
      lastUpdated: now,
      cardIds: cardsWithMetadata.map(card => card.id),
      cardCount: cardsWithMetadata.length,
      isPublic: false,
      tags: [topic.toLowerCase().replace(/\s+/g, '-')],
    };

    await setDoc(doc(db, 'users', userId, 'decks', deckId), deckData);

    return NextResponse.json({
      success: true,
      cards: cardsWithMetadata,
      deckId,
      userId,
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error generating flashcards' },
      { status: 500 }
    );
  }
}