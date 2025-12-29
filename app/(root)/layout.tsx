import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between px-8 py-5 rounded-2xl bg-gradient-to-r from-dark-200/80 to-dark-300/80 backdrop-blur-sm border border-dark-400/30 shadow-xl mb-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/logo.svg" alt="InterviewAI Pro Logo" width={42} height={36} />
          <h2 className="text-primary-200 font-bold tracking-tight text-xl group-hover:text-primary-100 transition-colors">InterviewAI Pro</h2>
        </Link>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
