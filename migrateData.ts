/*
This code here connects to the weaviate cluster and creates a collection for the quotes.
The csv file 'theOfficeQuotes' is then read and the data is stored in an array.
The vector database is then populated with the data, using openai embeddings api to vectorise the data 
*/

import weaviate, {ApiKey, ObjectsBatcher} from 'weaviate-ts-client';
const fs = require("fs");
const { parse } = require("csv-parse");

//client to connect to weaviate cluster, will need to add your own keys if you want to use
const client = weaviate.client({
    scheme: 'https',
    host: '',  
    apiKey: new ApiKey(''),  
    headers: { 'X-OpenAI-Api-Key': '' },
  });


const classObj = {
  class: 'Quote',
  properties:[
    {
      name: 'quote',
      dataType: ['text'],
    },
    {
      name: 'character',
      dataType: ['text'],
    }
  ],
  vectorizer: 'text2vec-openai',  
  moduleConfig: {
    'text2vec-openai': {},
    'generative-openai': {}  
  },
};


async function addSchema() {
  const res = await client.schema.classCreator().withClass(classObj).do();
  console.log(res);
}
addSchema();

interface quoteDataItem {
  quote: string; character: string
}
interface quoteData extends Array<quoteDataItem>{};


function migrateData(){
  const data:quoteData = [];
  fs.createReadStream("./theOfficeQuotes.csv")
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", function (row:quoteDataItem) {
      data.push(row);
    })
    .on("error", function (error: any) {
      console.log(error.message);
    })
    .on("end", function () {
      console.log("parsed csv data:");
      sendData(data);
    });
}


async function sendData(data:quoteData) {
    let batcher: ObjectsBatcher = client.batch.objectsBatcher();
    console.log("this: "+data[0]);  
    for (const item of data) {
      const obj = {
        class: 'Quote',
        properties: {
          quote: item.quote,
          character: item.character,
        },
      };
      batcher = batcher.withObject(obj);
    }
    const res = await batcher.do();
    console.log(res);
    batcher = client.batch.objectsBatcher();
  }

migrateData();