import BtnReload from "@/components/BtnReload";

import { SignOut } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
    return ;
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
