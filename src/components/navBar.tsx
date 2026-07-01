import { Link, NavLink } from "react-router-dom";
import { Search, Users } from "lucide-react";
import { useSelectedStore } from "@/store/useSelectedStore";

export default function Navbar() {
  const selectedProfiles = useSelectedStore(
    (state) => state.selectedProfiles
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-purple-700"
        >
          <Search size={24} />
          InfluencerHub
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex gap-8 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-600 transition"
            }
          >
            Discover
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              isActive
                ? "text-purple-600"
                : "text-gray-600 hover:text-purple-600 transition"
            }
          >
            Compare
          </NavLink>
        </div>

        {/* Selected Profiles */}
        <Link
          to="/compare"
          className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 transition px-4 py-2 rounded-full"
        >
          <Users size={18} />

          <span className="font-semibold">
            {selectedProfiles.length}
          </span>

          <span className="hidden sm:inline text-sm text-gray-600">
            Selected
          </span>
        </Link>
      </div>
    </nav>
  );
}