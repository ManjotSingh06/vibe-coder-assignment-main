import { Search, Mic } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="flex items-center w-full max-w-2xl bg-white rounded-full border border-gray-300 px-4 py-3 shadow-sm transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-purple-400">
        <Search className="text-gray-400 mr-3" size={20} />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search influencers..."
          className="flex-1 outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
        />

        <Mic
          size={20}
          className="text-blue-500 cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
}