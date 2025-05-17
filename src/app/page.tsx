'use client';
import BtnReload from "@/components/BtnReload";
import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import type { Session } from "next-auth";
const Page = () => {


  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await auth();
      if (!sess) {
        router.replace("/sign-in");
        return;
      }
      setSession(sess);
    };
    fetchSession();
  }, [router]);

  useEffect(() => {
    // Provjeravamo da li je već osvježeno
    const reloadCount = sessionStorage.getItem('reloadCount');

    if (!reloadCount || parseInt(reloadCount) < 1) {
      // Postavljamo brojač na 1
      sessionStorage.setItem('reloadCount', '1');
      // Osvježavamo stranicu
      window.location.reload();
    } else {
      // Resetujemo brojač za sljedeći put kada korisnik posjeti stranicu
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
        <BtnReload />
        <Link href="/todo">Todo</Link>
      </div>

      <SignOut />
    </>
  );
};

export default Page;
