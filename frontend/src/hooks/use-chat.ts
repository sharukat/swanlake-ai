import React from "react";
import { Message } from "@/app/models/utility";


export const useChat = () => {
    const [messages, setMessages] = React.useState<Message[]>([]);

    const generate = async (history: Message[]) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        history: history,
                    })
                }
            )

            const data = await response.json();
            console.log("Response", data);
            if (data) {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: data.response,
                        sender: "assistant",
                    },
                ]);
            }

        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return { messages, setMessages, generate }
};