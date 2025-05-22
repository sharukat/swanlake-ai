"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { IconArrowUp, IconMessage } from "@tabler/icons-react";
import { FaUser, FaRobot } from "react-icons/fa";
import { X } from "lucide-react";
import { LiaRobotSolid } from "react-icons/lia";
import { useChat } from "@/hooks/use-chat";
import { Message } from "@/app/models/utility";

export default function ChatAssistant() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const { messages, setMessages, generate } = useChat();

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage: Message = { text: message, sender: "user" };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessage("");

    try {
      await generate(updatedMessages);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  function handleClose() {
    if (isOpen) {
      setMessages([]);
      setMessage("");
      onClose();
    } else {
      onOpen();
    }
  }

  return (
    <div className="fixed bottom-0 right-0 m-4">
      <Popover
        size="lg"
        shouldCloseOnScroll={false}
        shouldBlockScroll={true}
        placement="top-end"
        isOpen={isOpen}
        onOpenChange={(open) => {
          if (open) {
            onOpen();
          } else {
            setMessages([]);
            setMessage("");
            onClose();
          }
        }}
      >
        <PopoverTrigger>
          <Button
            radius="full"
            size="lg"
            className="z-50 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onPress={handleClose}
            startContent={<IconMessage />}
          >
            Ask AI
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 md:w-80 lg:w-96">
          <div
            className="px-1 py-2 flex flex-col h-full w-full"
            style={{ height: "600px" }}
          >
            <div className="flex justify-between items-center border-b pb-2">
              <div className="text-base font-semibold">
                Swan Lake AI Assistant
              </div>
              <Button
                isIconOnly
                radius="full"
                variant="light"
                size="sm"
                onPress={handleClose}
              >
                <X size={18} />
              </Button>
            </div>
            <div
              className="flex-grow overflow-y-auto bg-gray-50 rounded-xl my-2"
              style={{ minHeight: "450px" }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <LiaRobotSolid className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Swan Lake AI Assistant is here to help you!
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div className="grid grid-cols-6 gap-3 items-center" key={index}>
                    {msg.sender === "user" && (
                      <div className="relative col-span-1">
                        <div className="flex items-center justify-center">
                          <FaUser className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                    <div className="relative col-span-5">
                      <div
                        key={index}
                        className={`my-2 p-2 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white ml-auto"
                            : "bg-gray-200 mr-auto"
                        } max-w-3/4`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    
                    {msg.sender === "assistant" && (
                      <div className="relative col-span-1">
                        <div className="flex items-center justify-center">
                          <FaRobot className="w-6 h-6" />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="relative w-full">
              <Input
                autoFocus
                className="w-full pr-12"
                radius="full"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                variant="bordered"
              />
              <div className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <Button
                  isIconOnly
                  radius="full"
                  className="bg-blue-600 text-white"
                  onPress={handleSendMessage}
                  size="sm"
                >
                  <IconArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
