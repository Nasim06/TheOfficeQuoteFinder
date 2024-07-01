"use client";

import getQuotes from "@/actions";
import { useState, useTransition } from "react";
import Quote from "./Quote";
import Skeleton from "./Skeleton";
import { quoteType } from "@/quoteType";
import { FaBackspace } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { examples } from "@/examples";

export default function QuoteFinder({
  initialSearchTerm,
  initialSearchResults,
}: {
  initialSearchTerm?: string;
  initialSearchResults?: quoteType[];
}) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? "");
  const [quotesAndcharactersArray, setQuotesAndcharactersArray] = useState<quoteType[]>(initialSearchResults ?? []);

  const wordSet = new Set(searchTerm.split(" "));

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (
    newSearchTerm?: string,
  ) => {
    if ((newSearchTerm ?? searchTerm).length > 0) {
      startTransition(async () => {
        const quotesAndcharactersArray = await getQuotes(newSearchTerm ?? searchTerm);
        console.log(quotesAndcharactersArray);

        setQuotesAndcharactersArray(quotesAndcharactersArray);
        const encodedSearchTerm = encodeURIComponent(
          newSearchTerm?.trim() ?? searchTerm.trim()
        );

        console.log(encodedSearchTerm);
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
        className="flex flex-row gap-2   flex-grow-0 w-auto  max-w-[750px] py-2  "
      >
        <input
          className="w-full   sm:font-serif sm:font-bold sm:text-3xl outline-none bg-transparent border-b-2 rounded-none sm:py-3 focus:border-highlight"
          type="text"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={(e) => {
            if (searchTerm !== "") {
              setQuotesAndcharactersArray([]);
            }

            setSearchTerm(e.currentTarget.value);
          }}
        />

        <button
          className="  bg-black bg-opacity-10 h-10  self-end   hover:scale-105    py-2 px-4 rounded-lg"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setQuotesAndcharactersArray([]);
            setSearchTerm("");
          }}
        >
          <FaBackspace className="h-5 w-5" />
        </button>

        <button
          type="submit"
          className={` ${
            isPending ? "animate-pulse" : ""
          } transition-all bg-gradient-to-br h-10  self-end   hover:scale-105   bg-highlight py-2 px-4 rounded-lg`}
        >
          <FaMagnifyingGlass className="h-5 w-5" />
        </button>
      </form>

      {isPending ? (
        <Skeleton times={5} />
      ) : (
        <div>
          {quotesAndcharactersArray.length > 0 ? (
            <div className="flex flex-row items-center justify-between max-w-[750px] py-5">
              <div className="uppercase text-sm">
                {quotesAndcharactersArray.length} results
              </div>
              <div>
                <button
                  className="sm:hidden bg-gradient-to-br hover:bg-gray-200 uppercase text-sm   border-[1px] border-gray-300 hover:text-black  py-1 px-2 rounded-lg"
                  onClick={() => {
                    navigator.share(
                      // current url
                      { url: window.location.href }
                    );
                  }}
                >
                  share
                </button>
              </div>
            </div>
          ) : (
            <div className="py-5">
              <div className="uppercase text-sm ">Example Arguments</div>
              <div className="flex flex-col gap-1 py-2">
                {examples.map((example, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTerm(example);
                      handleSubmit(example);
                    }}
                    className="group cursor-pointer relative shrink-0 self-start z-10"
                  >
                    {example}
                    <div className="absolute inset-x-0 bottom-0 h-2 group-hover:h-6  transition-all bg-highlight -z-10"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 grid-flow-row auto-rows-min gap-10 py-5 ">
            {quotesAndcharactersArray.map((quoteAndcharacter, index) => (
                <Quote
                    key={index}
                    quote={quoteAndcharacter}
                />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}