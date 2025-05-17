sign-in.tsx:
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

Nav.tsx:

/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react"; // Koristi useSession za autentifikaciju
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useGlobalContext } from '@/app/context/GlobalContext';
import { SignOut } from "./sign-out";

const Nav = () => {
    const { data: session, status } = useSession(); // Dohvata sesiju
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State za sidebar
    const { user, setUser } = useGlobalContext();
    return (
        <header>
            <nav className="flex justify-end items-center w-full px-8 py-5 bg-black text-white">
{user ? (
    <>
     <SignOut />
        <div className="ml-auto">
            <p>korisnik je : {user}</p>
        </div>

    </>
) : (
    <>
 <Link href="/sign-in">
            <h5>Prijavi se</h5>
        </Link>
    </>
)}
            </nav>
            {/* Sidebar komponenta */}
            {session && <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />}
        </header>
    );
};

export default Nav;
Problem je sledeći:
Kad oćo da se izlogujem (sign-out) uspkešno ne izloguje ali akd to uradim kad je otvorena neka strana ostavlja me na toj strani izlogovan. Neznam šta je problem?