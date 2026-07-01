import {
  Users,
  Heart,
  PlayCircle,
  Trophy,
  CheckCircle2,
} from "lucide-react";

import type { UserProfileSummary } from "@/types";

interface CompareStatsProps {
  profiles: UserProfileSummary[];
}

function formatNumber(value?: number) {
  if (!value) return "N/A";

  if (value >= 1_000_000_000)
    return (value / 1_000_000_000).toFixed(1) + "B";

  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(1) + "M";

  if (value >= 1_000)
    return (value / 1_000).toFixed(1) + "K";

  return value.toString();
}

export default function CompareStats({
  profiles,
}: CompareStatsProps) {
  if (profiles.length === 0) return null;

  const highestFollowers = [...profiles].sort(
    (a, b) => b.followers - a.followers
  )[0];

  const highestEngagement = [...profiles].sort(
    (a, b) =>
      (b.engagement_rate ?? 0) -
      (a.engagement_rate ?? 0)
  )[0];

  const highestViews = [...profiles].sort(
    (a, b) =>
      (b.avg_views ?? 0) -
      (a.avg_views ?? 0)
  )[0];

  const verifiedCount = profiles.filter(
    (p) => p.is_verified
  ).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Compared */}

      <div className="rounded-3xl border bg-white p-6 shadow-md hover:shadow-xl transition">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Compared Profiles
            </p>

            <h2 className="mt-2 text-4xl font-black">
              {profiles.length}
            </h2>

          </div>

          <div className="rounded-2xl bg-violet-100 p-4">
            <Users
              size={30}
              className="text-violet-600"
            />
          </div>

        </div>

      </div>

      {/* Followers */}

      <div className="rounded-3xl border bg-white p-6 shadow-md hover:shadow-xl transition">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Highest Followers
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {formatNumber(
                highestFollowers.followers
              )}
            </h2>

            <p className="mt-2 text-gray-600">
              @{highestFollowers.username}
            </p>

          </div>

          <div className="rounded-2xl bg-blue-100 p-4">
            <Trophy
              size={30}
              className="text-blue-600"
            />
          </div>

        </div>

      </div>

      {/* Engagement */}

      <div className="rounded-3xl border bg-white p-6 shadow-md hover:shadow-xl transition">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Best Engagement
            </p>

            <h2 className="mt-2 text-2xl font-bold">

              {highestEngagement.engagement_rate
                ? (
                    highestEngagement.engagement_rate *
                    100
                  ).toFixed(2) + "%"
                : "N/A"}

            </h2>

            <p className="mt-2 text-gray-600">
              @{highestEngagement.username}
            </p>

          </div>

          <div className="rounded-2xl bg-pink-100 p-4">
            <Heart
              size={30}
              className="text-pink-600"
            />
          </div>

        </div>

      </div>

      {/* Views */}

      <div className="rounded-3xl border bg-white p-6 shadow-md hover:shadow-xl transition">

        <div className="flex justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Highest Avg Views
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {formatNumber(
                highestViews.avg_views
              )}
            </h2>

            <p className="mt-2 text-gray-600">
              @{highestViews.username}
            </p>

          </div>

          <div className="rounded-2xl bg-green-100 p-4">
            <PlayCircle
              size={30}
              className="text-green-600"
            />
          </div>

        </div>

      </div>

      {/* Verified Summary */}

      <div className="md:col-span-2 xl:col-span-4 rounded-3xl border bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white shadow-lg">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-4">
            <CheckCircle2 size={36} />
          </div>

          <div>

            <h3 className="text-2xl font-bold">
              Verification Summary
            </h3>

            <p className="mt-2 text-violet-100">

              {verifiedCount} of {profiles.length} selected
              influencers are verified.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}