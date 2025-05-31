import CrowdDataForm from "@/components/client/bioDiversityForm";

export default function AdminPage() {
  return (
    <section
      key="admin"
      className="mx-auto w-full flex flex-col overflow-hidden items-center justify-center px-auto bg-white"
    >
      <div className="mx-auto flex flex-col max-w-5xl w-full justify-center items-center mt-5">
        <h1 className="text-3xl text-black font-bold my-10">
          Share Your Bird, Tree, or Plant Observations
        </h1>
        <CrowdDataForm />
      </div>
    </section>
  );
}
