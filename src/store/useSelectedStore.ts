import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "../types";

interface SelectedStore {
  selectedProfiles: UserProfileSummary[];

  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (username: string) => void;
  clearProfiles: () => void;
  isSelected: (username: string) => boolean;

  // Click counter
  profileClicks: Record<string, number>;
  incrementProfileClick: (username: string) => void;
  getProfileClickCount: (username: string) => number;
  clearProfileClicks: () => void;
}

export const useSelectedStore = create<SelectedStore>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],

      addProfile: (profile) => {
        const exists = get().selectedProfiles.some(
          (p) => p.username === profile.username
        );

        if (exists) return;

        set((state) => ({
          selectedProfiles: [...state.selectedProfiles, profile],
        }));
      },

      removeProfile: (username) => {
        set((state) => ({
          selectedProfiles: state.selectedProfiles.filter(
            (profile) => profile.username !== username
          ),
        }));
      },

      clearProfiles: () => {
        set({
          selectedProfiles: [],
        });
      },

      isSelected: (username) => {
        return get().selectedProfiles.some(
          (profile) => profile.username === username
        );
      },

      // -------------------------
      // Click Counter
      // -------------------------

      profileClicks: {},

      incrementProfileClick: (username) =>
        set((state) => ({
          profileClicks: {
            ...state.profileClicks,
            [username]: (state.profileClicks[username] || 0) + 1,
          },
        })),
      getProfileClickCount: (username) => get().profileClicks[username] ?? 0,

      clearProfileClicks: () => {
        set({
          profileClicks: {},
        });
      }
    }),
    {
      name: "selected-profiles",
    }
  )
);