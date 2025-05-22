import CrowdDataForm from "@/components/client/crowdDataForm";

export default function AdminPage() {
  // const [action, setAction] = useState<string | null>(null);
  // const [files, setFiles] = useState<File[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedNatureGroups, setSelectedNatureGroups] = useState([]);
  // const { addRecords } = useAddRecords();

  // const handleFileUpload = (files: File[]) => {
  //     setFiles(files);
  //     console.log("Files uploaded: ", files);
  // };

  // const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     try {
  //         const formData = new FormData();

  //         formData.append("category", selectedCategory);

  //         const commonName = e.currentTarget.elements.common_name.value;
  //         const scientificName = e.currentTarget.elements.scientific_name.value;
  //         const observedDate = e.currentTarget.elements.observed_date.value;
  //         formData.append("common_name", commonName);
  //         formData.append("scientific_name", scientificName);
  //         formData.append("observed_date", observedDate);

  //         if (files.length > 0) {
  //             formData.append("image", files[0]);
  //         }

  //         if (selectedNatureGroups.length > 0) {
  //             selectedNatureGroups.forEach(group => {
  //                 formData.append("nature_group", group);
  //             });
  //         }
  //         await addRecords(formData);
  //     } catch (error) {
  //         console.error("Error submitting form:", error);
  //     }
  // }

  // const handleCategoryChange = (e: any) => {
  //     const category = e.target.value;
  //     setSelectedCategory(category);
  //     // Reset nature groups when category changes
  //     setSelectedNatureGroups([]);
  // };

  // const handleNatureGroupChange = (e: any) => {
  //     const value = e.target.value;
  //     setSelectedNatureGroups(typeof value === 'string' ? value.split(',').filter(Boolean) : value);
  // };

  return (
    <section
      key="admin"
      className="w-full flex flex-col items-center justify-center px-auto bg-white"
    >
      <h1 className="text-3xl text-black font-bold mt-20 mb-5">
        Add Plants, Birds, or Animals Data
      </h1>

      <div className="flex flex-col max-w-5xl w-full justify-center items-center mx-auto mt-5">
        <CrowdDataForm />
      </div>
    </section>
  );
}
