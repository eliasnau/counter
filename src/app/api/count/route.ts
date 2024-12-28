import { Client, Databases } from 'node-appwrite';
import { DATABASE_ID, COLLECTION_ID, COUNTER_ID } from '@/lib/appwrite';
import { NextResponse } from 'next/server';

// Create a new client specifically for server-side API calls using node-appwrite
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const document = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      COUNTER_ID
    );

    return NextResponse.json(
      { count: document.count },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store, max-age=0',
        }
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counter' },
      { status: 500 }
    );
  }
} 