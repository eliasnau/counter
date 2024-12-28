import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  
  try {
    log('Get counter request received');
    
    try {
      const doc = await databases.getDocument(
        '676ff882001426600178',
        '676ff888000365b9a98b',
        'shared_counter'
      );
      
      return res.json({
        success: true,
        count: doc.count
      });
    } catch (error) {
      // If counter doesn't exist yet, return 0
      if (error.code === 404) {
        return res.json({
          success: true,
          count: 0
        });
      }
      throw error;
    }

  } catch (error) {
    log('Error:', error);
    return res.json({
      success: false,
      message: error.message || 'Unknown error'
    });
  }
}; 