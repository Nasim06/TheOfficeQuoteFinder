
import { quoteType } from "@/quoteType";
import Image from "next/image";

export default function Quote({
  quote,
}: {
  quote: quoteType;
}) {

    let src = "/";
    if(quote.character == "Michael"){
        src += "Michael.jpg";
    }
    if(quote.character == "Dwight"){
        src += "Dwight.jpg";
    }
    if(quote.character == "Pam"){
        src += "Pam.jpg";
    }
    if(quote.character == "Jim"){
        src += "Jim.jpg";
    }

    const imageStyle = {
        borderRadius: '200px',
        border: '1px solid #fff',
    }


  return (
    <div className="max-w-prose py-2 sm:py-5 ">
      <div className="flex flex-col z-40">
        <div className="flex-row flex items-center gap-5">
        <Image src={src} alt="profile" width={200} height={200} style={imageStyle} />
          <div className="flex flex-col w-full">
            <h2 className="text-xl font-semibold  font-serif  py-3">
              <span
                className={`relative hidden sm:inline-block transition-all duration-250 ${
                  false ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute  text-5xl font-extrabold  -top-16 -left-10 text-black opacity-10 ">
                  &ldquo;
                </div>
              </span>
              <div
                className="animate-pop-in sm:text-center"
                dangerouslySetInnerHTML={{ __html: quote.quote }}
              />
              <span
                className={`relative hidden sm:inline-block transition-all duration-250 ${
                  false ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute  text-5xl font-extrabold  -bottom-12 -right-4 text-black opacity-10 ">
                  &rdquo;
                </div>
              </span>
            </h2>
            <div className="flex flex-col justify-between gap-5">
              <p className=" italic text-center self-center">
                {" "}
                - {quote.character} -
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}