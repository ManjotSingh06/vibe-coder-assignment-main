import { Trash2, Trophy } from "lucide-react";
import { VerifiedBadge } from "@/features/profile/components/VerifiedBadge";
import { useSelectedStore } from "@/store/useSelectedStore";
import type { UserProfileSummary } from "@/types";

interface Props {
  profiles: UserProfileSummary[];
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

export default function CompareTable({
  profiles,
}: Props) {

  const removeProfile = useSelectedStore(
    (state) => state.removeProfile
  );

  const highestFollowers = Math.max(
    ...profiles.map((p) => p.followers)
  );

  const highestViews = Math.max(
    ...profiles.map((p) => p.avg_views ?? 0)
  );

  const highestEngagement = Math.max(
    ...profiles.map((p) => p.engagement_rate ?? 0)
  );

  const highestEngagements = Math.max(
    ...profiles.map((p) => p.engagements ?? 0)
  );

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full border-collapse">

        <thead className="sticky top-0 bg-gray-100">

          <tr>

            <th className="px-6 py-4 text-left font-bold">
              Creator
            </th>

            <th className="px-6 py-4 text-center">
              Platform
            </th>

            <th className="px-6 py-4 text-center">
              Followers
            </th>

            <th className="px-6 py-4 text-center">
              Avg Views
            </th>

            <th className="px-6 py-4 text-center">
              Engagement
            </th>

            <th className="px-6 py-4 text-center">
              Total Engagements
            </th>

            <th className="px-6 py-4 text-center">
              Verified
            </th>

            <th className="px-6 py-4 text-center">
              Remove
            </th>

          </tr>

        </thead>

        <tbody>

          {profiles.map((profile) => (

            <tr
              key={profile.user_id}
              className="border-t hover:bg-violet-50 transition"
            >

              {/* Profile */}

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={profile.picture}
                    alt={profile.username}
                    className="h-14 w-14 rounded-full border"
                  />

                  <div>

                    <div className="flex items-center gap-2 font-semibold">

                      @{profile.username}

                      <VerifiedBadge
                        verified={profile.is_verified}
                      />

                    </div>

                    <div className="text-sm text-gray-500">

                      {profile.fullname}

                    </div>

                  </div>

                </div>

              </td>

              {/* Platform */}

              <td className="text-center">

                <span className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700">

                  {getPlatform(profile)}

                </span>

              </td>

              {/* Followers */}

              <td className="text-center">

                <div className="flex justify-center items-center gap-2">

                  {profile.followers === highestFollowers && (
                    <Trophy
                      size={18}
                      className="text-yellow-500"
                    />
                  )}

                  <span
                    className={
                      profile.followers === highestFollowers
                        ? "font-bold text-green-600"
                        : ""
                    }
                  >
                    {formatNumber(profile.followers)}
                  </span>

                </div>

              </td>

              {/* Views */}

              <td className="text-center">

                <div className="flex justify-center items-center gap-2">

                  {profile.avg_views === highestViews &&
                    highestViews > 0 && (
                      <Trophy
                        size={18}
                        className="text-yellow-500"
                      />
                    )}

                  <span
                    className={
                      profile.avg_views === highestViews
                        ? "font-bold text-green-600"
                        : ""
                    }
                  >
                    {formatNumber(profile.avg_views)}
                  </span>

                </div>

              </td>

              {/* Engagement Rate */}

              <td className="text-center">

                <div className="flex justify-center items-center gap-2">

                  {profile.engagement_rate ===
                    highestEngagement && (
                    <Trophy
                      size={18}
                      className="text-yellow-500"
                    />
                  )}

                  <span
                    className={
                      profile.engagement_rate ===
                      highestEngagement
                        ? "font-bold text-green-600"
                        : ""
                    }
                  >
                    {profile.engagement_rate
                      ? (
                          profile.engagement_rate *
                          100
                        ).toFixed(2) + "%"
                      : "-"}
                  </span>

                </div>

              </td>

              {/* Engagements */}

              <td className="text-center">

                <div className="flex justify-center items-center gap-2">

                  {profile.engagements ===
                    highestEngagements && (
                    <Trophy
                      size={18}
                      className="text-yellow-500"
                    />
                  )}

                  <span
                    className={
                      profile.engagements ===
                      highestEngagements
                        ? "font-bold text-green-600"
                        : ""
                    }
                  >
                    {formatNumber(profile.engagements)}
                  </span>

                </div>

              </td>

              {/* Verified */}

              <td className="text-center">

                <VerifiedBadge
                  verified={profile.is_verified}
                />

              </td>

              {/* Remove */}

              <td className="text-center">

                <button
                  onClick={() =>
                    removeProfile(profile.user_id)
                  }
                  className="rounded-lg bg-red-100 p-2 transition hover:bg-red-200"
                >
                  <Trash2
                    size={18}
                    className="text-red-600"
                  />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}