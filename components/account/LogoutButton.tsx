"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type LogoutButtonProps = {
  className?: string;
  showIcon?: boolean;
  children?: React.ReactNode;
};

export default function LogoutButton({
  className = "",
  showIcon = true,
  children,
}: LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );

      setIsLoggingOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`
        flex
        items-center
        gap-2
        transition
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {showIcon && (
        <LogOut
          size={18}
          strokeWidth={1.7}
        />
      )}

      {isLoggingOut
        ? "Logging out..."
        : children || "Logout"}
    </button>
  );
}