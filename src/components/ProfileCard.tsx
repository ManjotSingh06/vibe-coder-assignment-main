import { useNavigate } from "react-router-dom";
import { Check, Plus, Music2 } from "lucide-react";
import { FaInstagram , FaYoutube} from "react-icons/fa";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useSelectedStore } from "@/store/useSelectedStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toString();
}

const platformIcons = {
  instagram: <FaInstagram size={16} />,
  youtube: <FaYoutube size={16} />,
  tiktok: <Music2 size={16} />,
};

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useSelectedStore((state) => state.addProfile);
  const isSelected = useSelectedStore((state) => state.isSelected);

  const added = isSelected(profile.username);

  const handleClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!added) {
      addProfile(profile);
    }
  };

  return (
    <div
      data-search={searchQuery}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10" />

      <div className="relative p-6">

        {/* Platform Badge */}
        <div className="flex justify-between items-center mb-5">

          <span className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 capitalize">
            {platformIcons[platform]}
            {platform}
          </span>

          {profile.is_verified && (
            <VerifiedBadge verified />
          )}

        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-5">
          <img
            src={profile.picture}
            alt={profile.fullname}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* User Info */}
        <div className="text-center">

          <h2 className="text-xl font-bold text-gray-900">
            {profile.fullname}
          </h2>

          <p className="text-gray-500">
            @{profile.username}
          </p>

          <div className="mt-4">
            <p className="text-3xl font-bold text-purple-600">
              {formatFollowersLocal(profile.followers)}
            </p>

            <p className="text-sm text-gray-500">
              Followers
            </p>
          </div>

        </div>

        {/* Button */}
        <button
          onClick={handleAddToList}
          disabled={added}
          className={`mt-6 w-full rounded-xl py-3 font-semibold transition flex items-center justify-center gap-2 ${
            added
              ? "bg-green-100 text-green-700"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg"
          }`}
        >
          {added ? (
            <>
              <Check size={18} />
              Added
            </>
          ) : (
            <>
              <Plus size={18} />
              Add to List
            </>
          )}
        </button>
      </div>
    </div>
  );
}