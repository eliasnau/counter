import { Client, Databases } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  
  try {
    log('Request received');

    const { userId, value } = req.bodyJson
    log('Parsed payload:', { value });
    
    if (!Number.isInteger(value)) {
      log('Invalid payload - value must be an integer');
      return res.json({
        success: false,
        message: 'Invalid payload - value must be an integer'
      });
    }

    if (value > 3 || value < -6) {
      log('Value out of allowed range (-6 to +3)');
      return res.json({
        success: false,
        message: 'Value must be between -6 and +3'
      });
    }

    try {
      const COUNTER_ID = 'shared_counter';
      let currentDoc;
      
      // Try to get the document, if it fails, create it
      try {
        currentDoc = await databases.getDocument(
          '676ff882001426600178',
          '676ff888000365b9a98b',
          COUNTER_ID
        );
      } catch (getError) {
        // If document doesn't exist, create it with initial count of 0
        currentDoc = await databases.createDocument(
          '676ff882001426600178',
          '676ff888000365b9a98b',
          COUNTER_ID,
          {
            count: 0
          }
        );
      }

      const newCount = currentDoc.count + value;
      
      if (newCount < 0) {
        log('Operation would result in negative value');
        return res.json({
          success: false,
          message: 'Count cannot go below 0'
        });
      }

      const updatedCounter = await databases.updateDocument(
        '676ff882001426600178',
        '676ff888000365b9a98b',
        COUNTER_ID,
        {
          count: newCount
        }
      );

      log('Document incremented successfully');
      return res.json({
        success: true,
        count: updatedCounter.count
      });

    } catch (incrementError) {
      log('Error during increment:', incrementError);
      return res.json({
        success: false,
        message: 'Failed to update counter'
      });
    }

  } catch (error) {
    log('Error:', error);
    return res.json({
      success: false,
      message: error.message || 'Unknown error'
    });
  }
}; 