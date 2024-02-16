import useResumes from "@/hooks/useResumes";

export default function RecordsPage() {
  let { data , deleteResume} = useResumes();
  console.log("Records Page: ",data);
  return (
      <>
        <p>ResumePage</p>
      </>
  );
}