"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {  useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
   router.push("/sign-in");
  };

  return (
    <div className="flex justify-center">
      <Button variant="destructive" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
