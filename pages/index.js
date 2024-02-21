import { HomeIcon, PencilIcon, MagnifyingGlassIcon, BriefcaseIcon, ListBulletIcon, EnvelopeIcon } from '@heroicons/react/24/solid'


export default function HomePage() {
  return (
      <div className="p-10">
        <h2 className="pt-5 pb-5 text-2xl  font-bold">Our Motivation:</h2>
        <h4 className="text-md">Welcome to First Draft where we believe that "There is no such thing as good writing, only good rewriting"(Robert Graves). In that spirit we built this tool to help job seekers overcome their writers block by using ChatGPT creating a first draft cover letter to improve upon and make their own!</h4>
        <h4 className="pt-5 pb-5 text-2xl  font-bold">Directions:</h4>
        <ul className="text-base">
          <li className="w-full flex flex-row items-start pb-3">
            <HomeIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Home:</p><p className="">Users can effortlessly review, edit, and delete saved records, providing a centralized location for efficient management.</p>
            </li>
          <li className="w-full flex flex-row items-start pb-3">
            <PencilIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Edit and Save:</p><p>Users can modify selected records and add new ones on this page.</p>
            </li>
          <li className="w-full flex flex-row items-start pb-3">
            <MagnifyingGlassIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Query:</p><p>Users begin the cover letter generation by offering precise guidelines for ChatGPT to follow.</p>
            </li>
          <li className="w-full flex flex-row items-start pb-3">
            <ListBulletIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Description:</p><p>Here, users provide details about the position they are applying for.</p>
            </li>
          <li className="w-full flex flex-row items-start pb-3">
            <BriefcaseIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Resume:</p><p>Users choose the most pertinent resume from their records for the job at hand.</p>
            </li>
          <li className="w-full flex flex-row items-start pb-3">
            <EnvelopeIcon className="w-5"/><p className="w-1/6 ml-3 font-bold" >Cover Letter:</p><p>Users choose a pre-existing cover letter that closely mirrors the desired tone for the generated cover letter.</p>
          </li>
        </ul>
      </div>
  );
}
