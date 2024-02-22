import { HomeIcon, BookOpenIcon, PencilIcon, MagnifyingGlassIcon, BriefcaseIcon, ListBulletIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'

export default function HomePage() {
  return (
      <div className="h-full p-10 flex flex-col flex-nowrap justify-between text-ivory">
        <h2 className="pt-5 pb-5 text-2xl font-bold text-center">Our Motivation:</h2>
        <h4 className="pl-5 text-md">Welcome to First Draft where we believe that <strong className="text-lg">"There is no such thing as good writing, only good rewriting"</strong>(Robert Graves). In that spirit we built this tool to help job seekers overcome their writers block by using ChatGPT creating a first draft cover letter to improve upon and make their own!</h4>
        <h4 className="pt-5 pb-5 text-2xl font-bold text-center">Directions:</h4>
        <ul className="pl-5 text-base">
          <li className="flex flex-row items-start w-full pb-3">
            <HomeIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >HOME:</p><p className="">You can always to return to this page to understand how to use our site.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <BookOpenIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >RECORDS:</p><p className="">You can review, edit, and delete saved records on this page.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <PencilIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >EDIT AND SAVE:</p><p>You can modify selected records and add new ones on this page.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <MagnifyingGlassIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >QUERY:</p><p>You begin the cover letter generation by offering precise guidelines for ChatGPT.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <ListBulletIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >DESCRIPTION:</p><p>You can provide details about the position you are applying for.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <BriefcaseIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >RESUME:</p><p>You choose the most pertinent resume from your records for the job at hand.</p>
            </li>
          <li className="flex flex-row items-start w-full pb-3">
            <EnvelopeIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >COVER LETTER:</p><p>Choose a cover letter to set the desired tone for the generated cover letter.</p>
          </li>
          <li className="flex flex-row items-start w-full pb-3">
            <LockClosedIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >LOGIN AND OUT:</p><p className="">Follow the lock icon to login and out.</p>
            </li>
        </ul>
      </div>
  );
}
