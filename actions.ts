"use server";

import weaviate, {ApiKey} from 'weaviate-ts-client';
import {quoteType} from './quoteType';

//you'll need to uncomment the below code and add your keys to use
const client = weaviate.client({
  scheme: 'https',
  host: '',
  apiKey: new ApiKey(''),
  headers: { 'X-OpenAI-Api-Key': '' },
});


export default async function getQuotes(searchTerm: string) {

  const res = await client.graphql
    .get()
    .withClassName('Quote')
    .withNearText({
      concepts: [searchTerm],
      targetVectors:['quote']
    })
    .withLimit(3)
    .withFields('quote character')
    .do();

  const quotesAndCharacters: quoteType[] = [];
  for (const quote of res.data.Get.Quote) {
    quotesAndCharacters.push({
      quote: quote.quote,
      character: quote.character,
    });
  }
  console.log(quotesAndCharacters);
  return quotesAndCharacters;
}




