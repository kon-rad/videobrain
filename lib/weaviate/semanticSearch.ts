import weaviate, {
  WeaviateClient,
  ObjectsBatcher,
  ApiKey,
} from "weaviate-ts-client";
import fetch from "node-fetch";

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "some-endpoint.weaviate.network", // Replace with your endpoint
  apiKey: new ApiKey("YOUR-WEAVIATE-API-KEY"), // Replace w/ your Weaviate instance API key
  headers: { "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY" }, // Replace with your inference API key
});

async function semanticSearch() {
  const res = await client.graphql
    .get()
    .withClassName("Question")
    .withFields("question answer category")
    .withNearText({ concepts: ["biology"] })
    .withLimit(2)
    .do();

  console.log(JSON.stringify(res, null, 2));
  return res;

  //   res:
  //   {
  //     "data": {
  //         "Get": {
  //             "Question": [
  //                 {
  //                     "answer": "DNA",
  //                     "category": "SCIENCE",
  //                     "question": "In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance"
  //                 },
  //                 {
  //                     "answer": "Liver",
  //                     "category": "SCIENCE",
  //                     "question": "This organ removes excess glucose from the blood & stores it as glycogen"
  //                 }
  //             ]
  //         }
  //     }
  // }
}

// await semanticSearch();
// await nearTextWhereQuery();

export { semanticSearch };
