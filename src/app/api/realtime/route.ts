import { NextResponse } from 'next/server';
import { DATABASE_ID, COLLECTION_ID, COUNTER_ID } from '@/lib/appwrite';

// This endpoint will provide the WebSocket URL from Appwrite
export async function GET() {
  return NextResponse.json({
    url: `wss://cloud.appwrite.io/v1/realtime`,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    channel: `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.${COUNTER_ID}`,
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
} 