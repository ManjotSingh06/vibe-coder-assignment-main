import { Trophy, Trash2 } from "lucide-react";
import { VerifiedBadge } from "@/features/profile/components/VerifiedBadge";
import { useSelectedStore } from "@/store/useSelectedStore";
import type { UserProfileSummary } from "@/types";

interface Props {
  profile: UserProfileSummary;
  highestFollowers: number;
  highestViews: number;
  highestEngagement: number;
  highestEngagements: number;
}

function formatNumber(value?: number) {
  if (!value) return "-";

  if (value >= 1_000_000_000)
    return (value / 1_000_000_000).toFixed(1) + "B";

  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(1) + "M";

  if (value >= 1_000)
    return (value / 1_000).toFixed(1) + "K";

  return value.toString();
}

function getPlatform(profile: UserProfileSummary) {
  if (profile.url.includes("instagram")) return "Instagram";
  if (profile.url.includes("youtube")) return "YouTube";
  if (profile.url.includes("tiktok")) return "TikTok";
  return "Unknown";
}

export default function CompareProfileCard({
  profile,
  highestFollowers,
  highestViews,
  highestEngagement,
  highestEngagements,
}: Props) {

  const removeProfile = useSelectedStore(
    (state) => state.removeProfile
  );

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-md">

      <div className="flex items-center gap-4">

        <img
          src={profile.picture}
          alt={profile.username}
          className="h-20 w-20 rounded-full border"
        />

        <div className="flex-1">

          <div className="flex items-center gap-2 text-lg font-bold">
            @{profile.username}
            <VerifiedBadge verified={profile.is_verified} />
          </div>

          <p className="text-gray-500">
            {profile.fullname}
          </p>

          <span className="mt-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-sm text-violet-700">
            {getPlatform(profile)}
          </span>

        </div>

        <button
          onClick={() => removeProfile(profile.user_id)}
          className="rounded-xl bg-red-100 p-3 hover:bg-red-200"
        >
          <Trash2 className="text-red-600" size={18} />
        </button>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <Metric
          label="Followers"
          value={formatNumber(profile.followers)}
          winner={profile.followers === highestFollowers}
        />

        <Metric
          label="Avg Views"
          value={formatNumber(profile.avg_views)}
          winner={profile.avg_views === highestViews}
        />

        <Metric
          label="Engagement"
          value={
            profile.engagement_rate
              ? (profile.engagement_rate * 100).toFixed(2) + "%"
              : "-"
          }
          winner={
            profile.engagement_rate === highestEngagement
          }
        />

        <Metric
          label="Engagements"
          value={formatNumber(profile.engagements)}
          winner={
            profile.engagements === highestEngagements
          }
        />

      </div>

    </div>
  );
}

interface MetricProps {
  label: string;
  value: string;
  winner: boolean;
}

function Metric({
  label,
  value,
  winner,
}: MetricProps) {

  return (
    <div
      className={`rounded-2xl border p-4 transition ${
        winner
          ? "border-green-500 bg-green-50"
          : "border-gray-200"
      }`}
    >

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">
          {label}
        </p>

        {winner && (
          <Trophy
            size={18}
            className="text-yellow-500"
          />
        )}

      </div>

      <h3
        className={`mt-2 text-xl font-bold ${
          winner
            ? "text-green-600"
            : "text-gray-900"
        }`}
      >
        {value}
      </h3>

    </div>
  );
}