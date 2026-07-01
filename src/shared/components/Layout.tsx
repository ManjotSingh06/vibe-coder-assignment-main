import type { ReactNode } from "react";

import Navbar from "./navBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>

    </div>
  );
}
