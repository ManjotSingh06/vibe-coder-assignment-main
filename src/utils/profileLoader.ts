import type {
  Platform,
  ProfileDetailResponse,
  SearchData,
  UserProfileSummary,
} from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

import instagramSearch from "@/assets/data/search/instagram.json";
import youtubeSearch from "@/assets/data/search/youtube.json";
import tiktokSearch from "@/assets/data/search/tiktok.json";

const searchData: Record<Platform, SearchData> = {
  instagram: instagramSearch as SearchData,
  youtube: youtubeSearch as SearchData,
  tiktok: tiktokSearch as SearchData,
};

function createFallbackProfile(
  user: UserProfileSummary
): ProfileDetailResponse {
  return {
    cached: false,
    data: {
      success: true,
      user_profile: {
        ...user,

        description: "No detailed profile available.",

        posts_count: undefined,

        avg_likes: user.engagements,

        avg_comments: undefined,

        avg_reels_plays: undefined,

        avg_views: user.avg_views,
      },
    },
  };
}

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const target = username.toLowerCase().trim();

  // -------------------------
  // Try dedicated profile JSON
  // -------------------------
  for (const loader of Object.values(profileModules)) {
    const result = await loader();

    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;

    const profile = data.data.user_profile;

    if (
      profile.username?.toLowerCase() === target ||
      profile.fullname?.toLowerCase() === target ||
      profile.handle?.toLowerCase() === target ||
      profile.custom_name?.toLowerCase() === target
    ) {
      return data;
    }
  }

  // -------------------------
  // Fallback to search datasets
  // -------------------------
  for (const platform of Object.keys(searchData) as Platform[]) {
    const accounts = searchData[platform].accounts;

    for (const item of accounts) {
      const user = item.account.user_profile;

      if (
        user.username?.toLowerCase() === target ||
        user.fullname?.toLowerCase() === target ||
        user.handle?.toLowerCase() === target ||
        user.custom_name?.toLowerCase() === target
      ) {
        return createFallbackProfile(user);
      }
    }
  }

  return null;
}