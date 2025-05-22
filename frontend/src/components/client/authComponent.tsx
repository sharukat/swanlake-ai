"use client";

import { useCallback } from "react";
import {
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    addToast,
} from "@heroui/react";
import { FaRegUser } from "react-icons/fa";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AuthComponent({ onSignInClick }: { onSignInClick: () => void }) {
    const { signOut } = useClerk();
    const router = useRouter();
    const { isSignedIn, user } = useUser();

    const handleSignOut = useCallback(async () => {
        try {
            await signOut();
            addToast({
                title: "Signed out successfully",
                color: "success",
            });
            // Optional: redirect to home or login page
            router.push("/");
        } catch {
            addToast({
                title: "Failed to sign out",
                color: "danger",
            });
        }
    }, [signOut, router]);

    if (isSignedIn && user) {
        return (
            <Dropdown>
                <DropdownTrigger>
                    <Avatar
                        src="/avatar.jpg"
                        name={user.fullName || user.username || "Community Member"}
                        className="cursor-pointer"
                    />
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key="username" isReadOnly className="text-center">
                        <p className="font-semibold">
                            {user.fullName || user.username || "User"}
                        </p>
                    </DropdownItem>
                    <DropdownItem
                        key="signout"
                        onPress={handleSignOut}
                        className="text-danger text-center"
                        color="danger"
                    >
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    return (
        <Button
            color="primary"
            radius="full"
            startContent={<FaRegUser />}
            onPress={onSignInClick} 
        >
            Sign In
        </Button>
    );
}