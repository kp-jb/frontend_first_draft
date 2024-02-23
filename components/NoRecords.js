import Link from "next/link";

export default function NoRecords(props) {
  return (
    <div className="h-[35vh] flex flex-col flex-nowrap align-center justify-between">
      <h2 className="text-center text-xl font-bold underline">{props.title}</h2>
      <p className="text-center">{props.message}</p>
      <Link
        className="w-full px-4 py-2 ml-auto mr-auto font-bold text-gray-950 p-1 ring-2 ring-slate-100 bg-ivory opacity-90 rounded-lg sm:w-1/2 md:w-1/3 lg:w-1/6 text-center"
        href="/editandsave"
      >
        CREATE
      </Link>
    </div>
  );
}
