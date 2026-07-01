import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {profiles.map((profile) => (
      <ProfileCard
        key={profile.user_id}
        profile={profile}
        platform={platform}
        searchQuery={searchQuery}
        onProfileClick={onProfileClick}
      />
    ))}
  </div>
  );
}