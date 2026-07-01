import { Link } from "react-router-dom";
import { Search, Users } from "lucide-react";

export default function EmptyCompare() {
  return (
    <div className="rounded-3xl border border-dashed border-violet-300 bg-white p-16 text-center shadow-lg">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">
        <Users className="h-12 w-12 text-violet-600" />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-gray-900">
        No Profiles Selected
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-gray-500">
        Select influencers from the Discover page to compare their audience,
        engagement, followers, views and other statistics.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
      >
        <Search size={18} />
        Browse Influencers
      </Link>
    </div>
  );
}