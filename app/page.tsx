import QuoteFinder from "../components/QuoteFinder";
import getQuotes from "@/actions";

export default async function Home({params,searchParams}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const searchTerm: string = searchParams.search as string;
  const initialSearchResults = searchTerm
    ? await getQuotes(searchTerm)
    : undefined;

  return (
    <div className="absolute inset-0 flex flex-col items-center overflow-x-hidden  text-indigo-950 ">
      <div className="flex flex-col sm:w-3/4 px-5">
        <div className="sm:py-24 py-16">
          <div className="text-5xl font-extrabold ">
            <a className="font-serif" href="/">
              Dunder Mifflin <span className="text-lg">inc</span> 
            </a>
          </div>
          <div className="text-lg  py-5">
            Enter one or many words to get a quote from the office tv show. This search uses Weaviate to provide
            vector similarity search.
          </div>
        </div>
        <QuoteFinder
          initialSearchTerm={searchTerm}
          initialSearchResults={initialSearchResults}
        />
      </div>
    </div>
  );
}