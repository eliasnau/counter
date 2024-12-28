import { NextResponse } from 'next/server';

// This endpoint will provide the WebSocket URL from Appwrite
export async function GET() {
  return NextResponse.json({
    url: `wss://cloud.appwrite.io/v1/realtime`,
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    channel: `databases.${process.env.DATABASE_ID}.collections.${process.env.COLLECTION_ID}.documents.${process.env.COUNTER_ID}`,
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
} 