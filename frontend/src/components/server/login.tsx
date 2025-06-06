"use client";

import React, { useCallback } from "react";
import {
  Tabs,
  Tab,
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  addToast,
  Link,
} from "@heroui/react";
import { FaLock, FaUser } from "react-icons/fa";
import { useSignIn } from "@clerk/nextjs";
import AuthComponent from "@/components/client/authComponent";
import NextLink from "next/link";

export default function SignInPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const [selected, setSelected] = React.useState("login");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isSignInLoaded) return;

      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });

        if (result.status === "complete") {
          addToast({
            title: "Signed-in successfully",
            color: "success",
          });
          await setActive({ session: result.createdSessionId });
          onOpenChange();
        }
      } catch {
        addToast({
          title: "Failed to sign-in",
          color: "danger",
        });
      }
    },
    [isSignInLoaded, signIn, setActive, onOpenChange]
  );

  return (
    <>
      <AuthComponent onSignInClick={onOpen} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <Tabs
                fullWidth
                aria-label="Tabs form"
                selectedKey={selected}
                size="md"
                onSelectionChange={(key) => setSelected(key as string)}
              >
                <Tab key="login" title="Login">
                  <ModalHeader className="flex flex-col gap-1">
                    Sign In to Contribute
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <Input
                        endContent={
                          <FaUser className="text-xl text-default-600 pointer-events-none flex-shrink-0" />
                        }
                        name="email"
                        label="Email or Username"
                        placeholder="Enter your email or username"
                        variant="bordered"
                        required
                      />
                      <Input
                        endContent={
                          <FaLock className="text-xl text-default-600 pointer-events-none flex-shrink-0" />
                        }
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        variant="bordered"
                        required
                      />
                      <ModalFooter className="flex flex-col items-center justify-center gap-5">
                        <p className="text-center text-small">
                          Need to create an account?{" "}
                          <Link
                            size="sm"
                            onPress={() => setSelected("sign-up")}
                          >
                            Sign up
                          </Link>
                        </p>
                        <div className="flex flex-row gap-5">
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            color="primary"
                            onPress={onClose}
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </ModalFooter>
                    </form>
                  </ModalBody>
                </Tab>

                <Tab key="sign-up" title="Sign up">
                  <ModalHeader>Sign up</ModalHeader>
                  <ModalBody>
                    <form className="flex flex-col gap-4 h-[300px]">
                      <Input
                        isRequired
                        label="Name"
                        placeholder="Enter your name"
                        type="password"
                      />
                      <Input
                        isRequired
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <Input
                        isRequired
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                      />

                      <ModalFooter className="flex flex-col items-center justify-center gap-5">
                        <p className="text-center text-small">
                          Already have an account?{" "}
                          <Link size="sm" onPress={() => setSelected("login")}>
                            Login
                          </Link>
                        </p>
                        <div className="flex flex-row gap-5">
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" isDisabled type="submit">
                            Sign up
                          </Button>
                        </div>
                      </ModalFooter>
                    </form>
                  </ModalBody>
                </Tab>
              </Tabs>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
