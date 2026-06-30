import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useSelectedStore } from "@/store/useSelectedStore";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";


function formatFollowersDetail(count: number) {
  if (count >= 1_000_000_000) {
    return (count / 1_000_000_000).toFixed(1) + "B";
  }

  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1) + "M";
  }

  if (count >= 1_000) {
    return (count / 1_000).toFixed(1) + "K";
  }

  return count.toString();
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();

  const platform = (searchParams.get("platform") || "instagram") as
    | "instagram"
    | "youtube"
    | "tiktok";

  const [profileData, setProfileData] =
    useState<ProfileDetailResponse | null>(null);

  const [loaded, setLoaded] = useState(false);

  const addProfile = useSelectedStore((state) => state.addProfile);
  const isSelected = useSelectedStore((state) => state.isSelected);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Invalid Profile</h2>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 text-white px-5 py-3 hover:bg-indigo-700"
          >
            Back to Search
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="animate-pulse max-w-6xl mx-auto">
          <div className="h-72 rounded-3xl bg-gray-200 mb-8"></div>

          <div className="grid grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (  
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-red-600 text-2xl font-bold">
            Unable to load profile
          </h2>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 text-white px-5 py-3"
          >
            Back
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const added = isSelected(user.username || user.handle || "");

  
  const badgeClass =
    platform === "instagram"
      ? "bg-pink-100 text-pink-600"
      : platform === "youtube"
      ? "bg-red-100 text-red-600"
      : "bg-black text-white";

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-8">

        <div className="max-w-6xl mx-auto">

          <Link to="/" className=" fixed  top-10  left-15   z-50    flex    items-center    gap-2     px-5    py-3    rounded-xl    bg-white/90    backdrop-blur-md    shadow-lg    border    border-gray-200    text-gray-700    hover:bg-white    hover:shadow-xl    hover:-translate-y-0.5    transition-all duration-300
  "  >
  ←
    </Link>
       
          {/* HERO CARD */}

          <div className="rounded-3xl bg-white shadow-xl border overflow-hidden">

            <div className="h-36 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

            <div className="px-10 pb-10">

              <div className="-mt-20 flex flex-col md:flex-row gap-8 items-start">

                <img
                  src={user.picture}
                  alt={user.fullname}
                  className="w-40 h-40 rounded-full border-8 border-white object-cover shadow-xl"
                />

                <div className="flex-1 pt-0">

                  <div className="flex flex-wrap items-center gap-3">

                    <h1 className="text-4xl font-bold">
                      {user.fullname}
                    </h1>

                    <VerifiedBadge verified={user.is_verified} />

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeClass}`}
                    >
                      {platform.toUpperCase()}
                    </span>

                  </div>

                  <p className=" text-2xl text-gray-500 mt-2 text-left w-full">
                    @{user.username || user.handle}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-8">

                    <a
                      href={user.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-black text-white hover:scale-105 transition"
                    >
                      Visit Profile →
                    </a>

                    <button
                      onClick={() => {
                        if (!added) {
                          addProfile(user);
                        }
                      }}
                      disabled={added}
                      className={`px-6 py-3 rounded-xl font-semibold transition ${
                        added
                          ? "bg-green-100 text-green-700 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {added ? "Added ✓" : "Add to List"}
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>
                    {/* Bio */}
          {user.description && (
            <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">
                {user.description}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              <p className="text-sm text-gray-500">Followers</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatFollowersDetail(user.followers)}
              </h3>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              <p className="text-sm text-gray-500">Engagement</p>
              <h3 className="text-2xl font-bold mt-2">
                {user.engagement_rate
                  ? `${(user.engagement_rate * 100).toFixed(2)}%`
                  : "N/A"}
              </h3>
            </div>

            {user.avg_views !== undefined && (
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                <p className="text-sm text-gray-500">Avg Views</p>
                <h3 className="text-2xl font-bold mt-2">
                  {formatFollowersDetail(user.avg_views)}
                </h3>
              </div>
            )}

            {user.engagements !== undefined && (
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                <p className="text-sm text-gray-500">Engagements</p>
                <h3 className="text-2xl font-bold mt-2">
                  {formatFollowersDetail(user.engagements)}
                </h3>
              </div>
            )}

            {user.posts_count !== undefined && (
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                <p className="text-sm text-gray-500">Posts</p>
                <h3 className="text-2xl font-bold mt-2">
                  {user.posts_count}
                </h3>
              </div>
            )}

            {user.avg_likes !== undefined && (
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                <p className="text-sm text-gray-500">Avg Likes</p>
                <h3 className="text-2xl font-bold mt-2">
                  {formatFollowersDetail(user.avg_likes)}
                </h3>
              </div>
            )}

            {user.avg_comments !== undefined && (
              <div className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
                <p className="text-sm text-gray-500">Avg Comments</p>
                <h3 className="text-2xl font-bold mt-2">
                  {formatFollowersDetail(user.avg_comments)}
                </h3>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          
        </div>
      </div>
    </Layout>
  );
}