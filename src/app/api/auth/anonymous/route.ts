import { NextResponse } from 'next/server';
import { account } from '@/lib/appwrite';

export async function GET() {
  try {
    const session = await account.createAnonymousSession();
    
    return NextResponse.json({ 
      sessionId: session.$id 
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error('Auth Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create session' 
    }, { 
      status: 500 
    });
  }
} 