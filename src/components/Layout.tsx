import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="p-4 bg-purple-100  w-full min-h-screen  rounded-3xl">
      <header className="mb-6  pb-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">
          Influencer Search
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
