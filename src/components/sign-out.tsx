"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleSignOut}>
        Odjavi se
      </Button>
    </div>
  );
};

export { SignOut };
