/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from "next/link";
import { useSession } from "next-auth/react"; // Koristi useSession za autentifikaciju
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useGlobalContext } from '@/app/context/GlobalContext';


const Nav = () => {
    const { data: session, status } = useSession(); // Dohvata sesiju
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State za sidebar
    const { user, setUser } = useGlobalContext();
    return (
        <header>
            <nav className="flex justify-end items-center w-full px-8 py-7 bg-black text-white">
{user ? (
    <>
    
        <div className="ml-auto">
            <p>korisnik je : {user}</p>
        </div>
    </>
) : (
    null
)}
            </nav>
            {/* Sidebar komponenta */}
            {session && <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} session={session} />}
        </header>
    );
};
export default Nav;
