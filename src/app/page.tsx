import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getWebRoute } from "@/lib/routes/web";

// TODO: clean up unnecessary lines

export default function Home() {
  return (
    <div className="h-screen min-h-screen overflow-auto bg-zinc-900">
      {/* <div className="fixed top-0 left-0 right-0 w-full max-w-full h-16 text-white bg-inherit border-b border-zinc-800 px-4 py-1 z-10"> */}
      <div className="fixed top-0 left-0 right-0 w-full max-w-full h-16 text-white bg-inherit px-4 py-1 z-10">
        {/* <div className="h-full w-16 relative flex justify-center items-center">
          <Image
            fill
            src="/logo_transparent.png"
            alt="Transparent logo image"
            layout="fill"
            objectFit="contain"
          />
        </div> */}
      </div>
      <main className="flex items-center justify-center pt-16 px-2 flex-1 overflow-auto sm:px-6 md:px-16">
        <div className="flex flex-col items-center text-slate-200 pt-4 mx-auto max-w-3xl">
          {/* <h1 className="flex flex-col items-center text-2xl font-medium leading-relaxed mb-4 sm:text-3xl md:mt-8 lg:mt-16 md:text-5xl md:leading-normal lg:text-7xl">
            <span className="inline-block pb-2 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-100 bg-clip-text text-transparent">Effortless Scheduling&nbsp;</span>
            <span className="inline-block pb-2 bg-gradient-to-br from-emerald-600 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">Easy RSVPs</span>
          </h1> */}
          <div className="h-48 w-48 relative sm:h-52 sm:w-72">
            <Image
              fill
              src="/logo_transparent.png"
              alt="Transparent logo image"
              objectFit="contain"
            />
          </div>
          <h1 className="flex flex-col items-center text-3xl font-medium leading-none mb-4 sm:text-5xl sm:leading-relaxed md:text-5xl md:leading-normal lg:text-7xl">
            <span className="inline-block pb-2 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-100 bg-clip-text text-transparent">
              Effortless Scheduling
            </span>
            <span className="inline-block pb-2 bg-gradient-to-br from-emerald-600 via-emerald-400 to-emerald-300 bg-clip-text text-transparent">
              Easy RSVPs
            </span>
          </h1>
          <p className="text-center leading-relaxed inline-block px-4 mb-6 text-sm text-slate-300 sm:text-base sm:px-8 md:text-lg">
            Eventuner streamlines the event planning process,&nbsp;
            <br className="block lg:hidden" />
            making it easier for both organizers and participants&nbsp;
            <br className="hidden sm:block md:block lg:hidden" />
            to manage their schedules and confirm attendance.
            <br className="block" />
            No more back-and-forth emails or messages to find the best date!
          </p>
          <Button className="p-0 flex items-center justify-center bg-emerald-600 border border-emerald-500 hover:bg-emerald-700">
            <Link
              href={getWebRoute("event")}
              className="flex items-center justify-center p-4 w-full h-full"
            >
              Schedule Event
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
