import { Trash2, Users } from "lucide-react";
import { useSelectedStore } from "@/store/useSelectedStore";

export default function SelectedSidebar() {
  const selectedProfiles = useSelectedStore(
    (state) => state.selectedProfiles
  );

  const removeProfile = useSelectedStore(
    (state) => state.removeProfile
  );

  const clearProfiles = useSelectedStore(
    (state) => state.clearProfiles
  );

  return (
    <div className="w-80 h-screen bg-white p-5 shadow-lg rounded-l-2xl flex flex-col">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-purple-100">
          <Users className="text-purple-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Selected Profiles
          </h2>

          <p className="text-sm text-gray-500">
            {selectedProfiles.length} selected
          </p>
        </div>
      </div>

      {/* Empty State */}

      {selectedProfiles.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <Users
            size={55}
            className="text-purple-200 mb-4"
          />

          <h3 className="font-semibold text-gray-700">
            No Profiles Yet
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Click
            <span className="font-semibold text-purple-600">
              {" "}
              Add to List
            </span>
            <br />
            to save influencers here.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-3">
            {selectedProfiles.map((profile) => (
              <div
                key={profile.username}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition"
              >
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-sm">
                    {profile.fullname}
                  </h3>

                  <p className="text-xs text-gray-500">
                    @{profile.username}
                  </p>

                  <p className="text-xs text-purple-600 font-medium">
                    {profile.followers.toLocaleString()} Followers
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeProfile(profile.username)
                  }
                  className="p-2 rounded-full hover:bg-red-100 transition"
                >
                  <Trash2
                    size={18}
                    className="text-red-500"
                  />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearProfiles}
            className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold hover:scale-[1.02] transition"
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
}