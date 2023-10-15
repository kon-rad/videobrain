import weaviate, { WeaviateClient, ObjectsBatcher, ApiKey } from 'weaviate-ts-client';
import fetch from 'node-fetch';

const client: WeaviateClient = weaviate.client({
  scheme: 'https',
  host: 'some-endpoint.weaviate.network',  // Replace with your endpoint
  apiKey: new ApiKey('YOUR-WEAVIATE-API-KEY'),  // Replace w/ your Weaviate instance API key
  headers: { 'X-OpenAI-Api-Key': 'YOUR-OPENAI-API-KEY' },  // Replace with your inference API key
});


async function getJsonData() {
  const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
  return file.json();
}

async function importData() {
  // Get the questions directly from the URL
  const data = await getJsonData();

  // Prepare a batcher

  
  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const question of data) {
    // Construct an object with a class and properties 'answer' and 'question'
    const obj = {
      class: 'Question',
      properties: {
        answer: question.Answer,
        question: question.Question,
        category: question.Category,
      },
    };

    // add the object to the batch queue
    batcher = batcher.withObject(obj);

    // When the batch counter reaches batchSize, push the objects to Weaviate
    if (counter++ == batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}

await importData();