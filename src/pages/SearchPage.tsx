import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import SelectedSidebar from "@/components/SelectedSideBar";
import { useSelectedStore } from "@/store/useSelectedStore";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    setClickCount((prev) => prev + 1);
    console.log("Clicked profile:", username, "total clicks:", clickCount);
  };

  const selectedProfiles = useSelectedStore(
    (state) => state.selectedProfiles
  );

  return (
    <Layout>
      
      <div className="flex flex-col items-center justify-center text-center py-6 space-y-2 ">
        <h1 className="text-6xl font-black">
            Discover the World's
            <span className="text-purple-600">
                Top Influencers
            </span>
        </h1>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Search creators across Instagram, YouTube and TikTok.
            Compare engagement, audience size and performance.
        </p>

      </div>
      <div className="max-w-7xl mx-auto flex gap-2">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto">

          <PlatformFilter
            selected={platform}
            onChange={(p) => {
              setPlatform(p);
              setSearchQuery("");
            }}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="flex items-center justify-between mt-5 mb-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold">
                {filtered.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {allProfiles.length}
              </span>{" "}
              creators on{" "}
              <span className="capitalize font-semibold">
                {platform}
              </span>
            </p>
          </div>

          <ProfileList
            profiles={filtered}
            platform={platform}
            searchQuery={searchQuery}
            onProfileClick={handleProfileClick}
          />
        </div>

        {/* Sidebar */}
        {selectedProfiles.length > 0 && (
          <div className="hidden lg:block w-80 shrink-0 sticky top-24 h-screen bg">
            <SelectedSidebar />
          </div>
        )}
      </div>
    </Layout>
  );
}
