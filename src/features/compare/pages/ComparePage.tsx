import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, BarChart3 } from "lucide-react";

import { Layout } from "@/shared/components/Layout";
import CompareStats from "@/features/compare/components/CompareStats";
import CompareTable from "@/features/compare/components/CompareTable";
import EmptyCompare from "@/features/compare/components/EmptyCompare";


import { useSelectedStore } from "@/store/useSelectedStore";

export default function ComparePage() {
  const selectedProfiles = useSelectedStore(
    (state) => state.selectedProfiles
  );

  // Update this if your store uses another function name
  const clearProfiles =
    useSelectedStore((state: any) => state.clearProfiles) ||
    (() => console.warn("clearProfiles not implemented"));

  const compareCount = selectedProfiles.length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 p-10 text-white shadow-xl">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <Link
                to="/"
                className="absolute left-0 top-0 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur hover:bg-white/25 transition"
              >
                <ArrowLeft size={18} />
                Back to Discover
              </Link>

              <h1 className="mt-6 text-5xl font-black tracking-tight">
                Compare Influencers
              </h1>

              <p className="mt-4 max-w-2xl text-lg text-violet-100 leading-relaxed">
                Compare audience size, engagement, views and performance
                across Instagram, YouTube and TikTok.
              </p>
            </div>

            <div className="rounded-3xl bg-white/15 backdrop-blur-lg px-8 py-6 shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-white/20 p-4">
                  <BarChart3 size={36} />
                </div>

                <div>
                  <div className="text-5xl font-black">
                    {compareCount}
                  </div>

                  <div className="text-violet-100">
                    Profiles Selected
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Empty State */}

        {compareCount === 0 ? (
          <div className="mt-10">
            <EmptyCompare />
          </div>
        ) : (
          <>
            {/* Stats */}

            <div className="mt-10">
              <CompareStats profiles={selectedProfiles} />
            </div>

            {/* Compare Card */}

            <div className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-xl overflow-hidden">

              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b px-8 py-6">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Comparison Table
                  </h2>

                  <p className="mt-1 text-gray-500">
                    Compare every selected influencer side-by-side.
                  </p>

                </div>

                <button
                  onClick={clearProfiles}
                  className="mt-4 md:mt-0 inline-flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white font-medium transition hover:bg-red-600"
                >
                  <Trash2 size={18} />
                  Clear All
                </button>

              </div>

              <CompareTable profiles={selectedProfiles} />

            </div>

            {/* Future Chart Placeholder */}

            <div className="mt-10 rounded-3xl border bg-white p-8 shadow-lg">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    Visual Comparison
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Radar chart and analytics coming soon.
                  </p>

                </div>

                <div className="rounded-full bg-violet-100 p-5">
                  <BarChart3
                    className="text-violet-600"
                    size={36}
                  />
                </div>

              </div>

              <div className="mt-10 flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50">

                <div className="text-center">

                  <BarChart3
                    size={64}
                    className="mx-auto text-violet-400"
                  />

                  <h3 className="mt-5 text-xl font-semibold">
                    Interactive Charts
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Followers • Engagement • Views • Growth
                  </p>

                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </Layout>
  );
}