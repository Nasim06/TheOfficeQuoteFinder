# The office tv show quote finder

This search bar allows you to type in some words and provides the most related quotes from the office tv show.

This project uses the Weaviate vector database to provide vector simialrity search and the openAi ada embeddings model to vectorize the data.

### Here is an example of it in operation 
https://github.com/Nasim06/TheOfficeQuoteFinder/assets/79113348/395ff216-e58a-468d-a4d3-b595e86126d4

## How to run it

After you have cloned the project with
```
git clone https://github.com/Nasim06/TheOfficeQuoteFinder.git
```
You will need to run this to download all the dependencies
```
npm install
```
You then need to create a Weaviate cluster on Weaviate cloud, take note of your url and key.<br>
Now create an account with openAi and purchase some tokens.<br>
If you already have an account and some tokens, don't purchase more, it only costs around 1 cent to do all these embeddings.<br>
You should now add the weaviate cluster url, cluster key and openAi key to both the action.ts and migrateData.ts files.<br>
This is best done using a .env file so as to keep your keys safe. Please be careful with your keys.<br>
You now need to run the migrateData.ts file, this will: create the collection in your cluster; parse through the provided csv; and send the data off to be
vectorized and stored in the vector database. You should run these commands.
```
tsc migrateData.ts
node migrateData.js
```
If everything went fine, you should now see an object count of 1749 on your cluster on weaviate cloud dashboard.
You can now get everything running with
```
npm run dev
```

