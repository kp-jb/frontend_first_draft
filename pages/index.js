import {
  HomeIcon,
  BookOpenIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ListBulletIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

export default function HomePage() {
  return (
    <div className="h-full p-10 flex flex-col flex-nowrap justify-between text-ivory overflow-y-auto">
      <div>
        <h2 className="pt-5 pb-5 text-2xl font-bold text-center underline">
          OUR MOTIVATION
        </h2>
        <h4 className="pl-5 text-md">
          Welcome to First Draft where we believe that{" "}
          <strong className="text-lg">
            "There is no such thing as good writing, only good rewriting"
          </strong>
          (Robert Graves). In that spirit we built this tool to help job seekers
          overcome their writers block by using ChatGPT creating a first draft
          cover letter to improve upon and make their own!
        </h4>
        <h4 className="pt-5 pb-5 text-2xl font-bold text-center underline">
          INSTRUCTIONS
        </h4>
        <ul className="pl-5 text-base sm:text-xs lg:text-md">
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <HomeIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">HOME:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Return to this page to understand how to use our site.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <BookOpenIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">RECORDS:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Review, edit, and delete saved records on this page.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <PencilIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">EDIT AND SAVE:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">Modify records and add new ones on this page.</p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <MagnifyingGlassIcon className="w-0 lg:w-5" />
              <p className="ml-2 font-bold">QUERY:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Begin the cover letter generation by offering precise guidelines for
              ChatGPT.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <ListBulletIcon className="w-0 lg:w-5" />
              <p className="ml-2 font-bold">DESCRIPTION:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Provide details about the position you are applying for.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <BriefcaseIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">RESUME:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Choose the most pertinent resume from your records for the job at
              hand.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <EnvelopeIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">COVER LETTER:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">
              Choose a cover letter to set the desired tone for the generated
              cover letter.
            </p>
          </li>
          <li className="flex flex-col items-start lg:flex-row flex-nowrap w-full pb-5">
            <div className="flex flex-row flex-nowrap justify-center lg:justify-start w-full lg:w-1/6 ml-3 mb-2">
              <LockClosedIcon className="w-0 lg:w-5" />
              <p className="ml-3 font-bold">LOGIN AND OUT:</p>
            </div>
            <p className="w-full md:w-5/6 text-center lg:text-left">Follow the lock icon to login and out.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
