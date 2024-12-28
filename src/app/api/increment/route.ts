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
    const { value } = await request.json();
    console.log('Parsed payload:', { value });
    
    // Validate input
    if (!Number.isInteger(value)) {
      console.log('Invalid payload - value must be an integer');
      return NextResponse.json({
        success: false,
        message: 'Invalid payload - value must be an integer'
      }, { status: 400 });
    }

    if (value > 3 || value < -6) {
      console.log('Value out of allowed range (-6 to +3)');
      return NextResponse.json({
        success: false,
        message: 'Value must be between -6 and +3'
      }, { status: 400 });
    }

    try {
      let currentDoc;
      
      // Try to get the document, if it fails, create it
      try {
        currentDoc = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          COUNTER_ID
        );
      } catch (getError) {
        // If document doesn't exist, create it with initial count of 0
        currentDoc = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          COUNTER_ID,
          {
            count: 0
          }
        );
      }

      const newCount = currentDoc.count + value;
      
      if (newCount < 0) {
        console.log('Operation would result in negative value');
        return NextResponse.json({
          success: false,
          message: 'Count cannot go below 0'
        }, { status: 400 });
      }

      const updatedCounter = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        COUNTER_ID,
        {
          count: newCount
        }
      );

      console.log('Document incremented successfully');
      return NextResponse.json({
        success: true,
        count: updatedCounter.count
      });

    } catch (incrementError) {
      console.error('Error during increment:', incrementError);
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