import { useNavigate } from "react-router-dom";
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
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M followers";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K followers";
  return count + " followers";
}

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
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (
    e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!added){
      addProfile(profile);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowersLocal(profile.followers)}</div>
      </div>
      {/* TODO: candidates must implement Add to List feature */}
      {/* TODO: candidates must implement Add to List feature */}
      <button
        onClick={handleAddToList}
        disabled= {added}
        className={`px-4 py-2 rounded-md text-sm font-medium transition ${
        added
          ? "bg-green-100 text-green-700 cursor-not-allowed"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
      >
        {added ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
