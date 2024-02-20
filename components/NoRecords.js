import Link from "next/link";

export default function NoRecords(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <Link
        href="/editandsave"
      >
      Create
      </Link> 
    </div>
  );
};