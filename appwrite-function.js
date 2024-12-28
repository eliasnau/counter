const { Client, Databases } = require('node-appwrite');

module.exports = async function(req, res) {
  const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const { userId, value } = JSON.parse(req.payload);

  try {
    // Check if request is authenticated
    if (!req.variables.APPWRITE_FUNCTION_USER_ID) {
      throw new Error('Unauthorized');
    }

    // Increment counter atomically
    const updatedCounter = await databases.incrementDocument(
      'counter_database',
      'counters',
      userId,
      'count',
      value
    );

    return res.json({
      success: true,
      count: updatedCounter.count
    });

  } catch (error) {
    // If document doesn't exist, create it first then try again
    if (error.code === 404) {
      try {
        await databases.createDocument(
          'counter_database',
          'counters',
          userId,
          { count: 0 }
        );
        
        // Now increment the newly created document
        const updatedCounter = await databases.incrementDocument(
          'counter_database',
          'counters',
          userId,
          'count',
          value
        );

        return res.json({
          success: true,
          count: updatedCounter.count
        });
      } catch (createError) {
        return res.json({
          success: false,
          message: 'Failed to create counter'
        });
      }
    }

    console.error('Error:', error);
    return res.json({
      success: false,
      message: error.message
    });
  }
}; 