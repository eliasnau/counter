/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Client, Account, Functions, Databases, Models } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

export const account = new Account(client)
export const functions = new Functions(client)
export const databases = new Databases(client)

export const FUNCTION_ID = 'increment-counter'
export const GET_COUNTER_FUNCTION_ID = 'get-counter'
export const DATABASE_ID = '676ff882001426600178'
export const COLLECTION_ID = '676ff888000365b9a98b'
export const COUNTER_ID = 'shared_counter'

export const anonymousLogin = async () => {
  try {
    const session = await account.getSession('current')
      .catch(() => account.createAnonymousSession());
    return session;
  } catch (error: any) {
    console.error('Appwrite anonymous login error:', error);
    throw error;
  }
}

export const incrementCounter = async ( value: number) => {
  try {
    // const execution = await functions.createExecution(
    //   FUNCTION_ID,
    //   JSON.stringify({ userId, value })
    // );
    
    // return JSON.parse(execution.responseBody || '{"success":false,"message":"Empty response"}');

    const response = await fetch('/api/increment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      });

      return response.json();
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return { success: false, message: 'Request failed' };
  }
}

export const getCounter = async () => {
  try {
    const execution = await functions.createExecution(
      GET_COUNTER_FUNCTION_ID
    );
    
    try {
      return JSON.parse(execution.responseBody) || { success: false, message: 'Empty response' };
    } catch (parseError) {
      console.error('Failed to parse response:', execution.responseBody);
      return { success: false, message: 'Invalid response format' };
    }
  } catch (error) {
    console.error('Error getting counter:', error);
    throw error;
  }
};

interface CounterDocument extends Models.Document {
  count: number;
}

interface RealtimeResponse {
  events: string[];
  payload: CounterDocument;
}

export const subscribeToCounter = (onUpdate: (count: number) => void) => {
  return client.subscribe<RealtimeResponse>(
    `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.${COUNTER_ID}`,
    (response) => {
      if (response.events.includes(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.${COUNTER_ID}.update`)) {
        const newCount = (response.payload as any).count;
        onUpdate(newCount);
      }
    }
  );
}; 