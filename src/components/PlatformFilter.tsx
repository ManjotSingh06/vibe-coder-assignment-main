import { Search, Music2 } from "lucide-react";
import { FaInstagram , FaYoutube} from "react-icons/fa";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const platformIcons = {
  instagram: <FaInstagram size={18} />,
  youtube: <FaYoutube size={18} />,
  tiktok: <Music2 size={18} />,
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-gray-200 px-5 py-3 shadow-sm transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-purple-500">
          <Search
            size={20}
            className="text-gray-400 mr-3 shrink-0"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search influencers by username or name..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Platform Pills */}
      <div className="flex flex-wrap justify-center gap-4">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            onClick={() => onChange(platform)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
              selected === platform
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border-transparent"
                : "bg-white text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md"
            }`}
          >
            {platformIcons[platform]}
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>
    </div>
  );
}