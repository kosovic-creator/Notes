'use client';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/sign-in");
    }
  }, [status, router]);

  useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if (!reloadCount || parseInt(reloadCount) < 1) {
      sessionStorage.setItem('reloadCount', '1');
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);

  if (status === "loading" || !session) {
    return null;
  }

  return (
    <>
      {/* <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
        <p className="text-gray-600">Signed in as:</p>
        <p className="font-medium">{session.user?.email}</p>
        <BtnReload />
        <Link href="/todo">Todo</Link>
      </div>
      <SignOut /> */}
    </>
  );
};

export default Page;
