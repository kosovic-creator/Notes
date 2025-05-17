"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {  useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
   router.push("/sign-in");
  };

  return (
    <div className="flex justify-center">
      <Link href="/sign-in">
      <Button  onClick={handleSignOut}>
       Odjavi se
      </Button>
      </Link>
    </div>
  );
};

export { SignOut };
