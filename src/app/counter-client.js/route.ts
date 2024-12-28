import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // Read the compiled JS version of the counter client
  const clientPath = path.join(process.cwd(), '.next/static/chunks/counter-client.js');
  const clientScript = fs.readFileSync(clientPath, 'utf-8');

  return new NextResponse(clientScript, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
} 