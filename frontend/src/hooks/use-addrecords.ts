import { addToast } from "@heroui/react";

export const useAddRecords = () => {
    const addRecords = async (formData: FormData) => {
        try {
            console.log("FormData contents before sending:");
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value}`);
            }

            const hasFile = formData.has('image');
            console.log("FormData has image file:", hasFile);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/mongo`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to create record:", errorText);
                addToast({
                    title: "Error",
                    description: "Failed to save record.",
                    color: "danger",
                    radius: "lg",
                })
            }
            addToast({
                title: "Success",
                description: "Saved in database successfully",
                color: "success",
                radius: "lg",
            });

        } catch (error) {
            console.error("Submission error:", error);
            addToast({
                title: "Error",
                description: "Submission failed.",
                color: "danger",
                radius: "lg",
            })
        }
    }
    return { addRecords }
}