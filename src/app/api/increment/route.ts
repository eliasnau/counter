import { Client, Databases } from 'node-appwrite';
import { NextResponse } from 'next/server';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DATABASE_ID = '676ff882001426600178';
const COLLECTION_ID = '676ff888000365b9a98b';
const COUNTER_ID = 'shared_counter';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const value = body.value;

    // Validate input
    if (typeof value !== 'number') {
      return NextResponse.json({
        success: false,
        message: 'Value must be a number'
      }, { status: 400 });
    }

    if (value < -6 || value > 3) {
      return NextResponse.json({
        success: false,
        message: 'Value must be between -6 and 3'
      }, { status: 400 });
    }

    try {
      const result = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        COUNTER_ID,
        {
          count: `increment(${value})`
        }
      );

      return NextResponse.json({
        success: true,
        count: result.count
      });
    } catch {
      return NextResponse.json({
        success: false,
        message: 'Failed to update counter'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 