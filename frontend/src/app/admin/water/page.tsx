import WaterQualityForm from "@/components/client/waterQualityForm";

export default function WaterQualityDataPage() {
  return (
    <section
      key="admin"
      className="w-full flex flex-col items-center justify-center px-auto bg-white"
    >
      <h1 className="text-3xl text-black font-bold mt-20 mb-5">Add Water Quality Data</h1>

      <div className="flex flex-col max-w-5xl w-full justify-center items-center mx-auto mt-5">
        <WaterQualityForm />
      </div>
    </section>
  );
}
