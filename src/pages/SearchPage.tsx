import { useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import SelectedSidebar from "@/components/selectedSideBar";
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
    <Layout title="Find Influencers">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Main Content */}
        <div className="flex-1 max-w-4xl mx-auto">
          <p className="text-gray-500 mb-6">
            Browse top creators across social platforms
          </p>

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
          <div className="hidden lg:block w-80 shrink-0">
            <SelectedSidebar />
          </div>
        )}
      </div>
    </Layout>
  );
}
