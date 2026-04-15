"use client";

import { useRef, useState } from "react";

type VideoCard = {
  id: string;
  title: string;
  blurb: string;
  accent: string;
  sectionId: string;
  sectionLabel: string;
};

type SectionRow = {
  id: string;
  label: string;
  vids: VideoCard[];
};

const rowBlurbs = [
  "click to feature this on the big screen",
  "one tiny detail makes it way worse",
  "the comments only made it messier",
  "this absolutely spirals by minute three",
];

const makeRow = (
  id: string,
  label: string,
  accent: string,
  titles: string[],
): SectionRow => ({
  id,
  label,
  vids: Array.from({ length: 12 }, (_, index) => ({
    id: `${id}-${index}`,
    title: titles[index % titles.length],
    blurb: rowBlurbs[(index + id.length) % rowBlurbs.length],
    accent,
    sectionId: id,
    sectionLabel: label,
  })),
});

const sections: SectionRow[] = [
  makeRow("top-vids", "top vids", "rgba(255, 111, 97, 0.68)", [
    "insane reddit story that ruins your night",
    "this family group chat should have stayed private",
    "the wedding toast went criminally off script",
    "coworker drama with a cursed update",
    "the plot twist in the final screenshot",
    "roommate story that keeps getting worse",
  ]),
  makeRow("aitah", "aitah", "rgba(255, 140, 130, 0.56)", [
    "AITAH for muting my entire family",
    "AITAH for leaving in the middle of dinner",
    "AITAH for exposing the fake apology",
    "AITAH for charging rent to my cousin",
    "AITAH for returning the gift immediately",
    "AITAH for screenshotting the proof",
  ]),
  makeRow("scary-stories", "scary stories", "rgba(0, 229, 255, 0.46)", [
    "the voice note from the empty hallway",
    "my upstairs neighbor moved out last year",
    "there was breathing in the baby monitor",
    "the motel mirror was facing the wrong way",
    "someone replied from my old phone",
    "the basement door was already unlocked",
  ]),
  makeRow(
    "relationship-drama",
    "relationship drama",
    "rgba(255, 123, 112, 0.52)",
    [
      "he sent the same paragraph to two exes",
      "she found the second birthday reservation",
      "the soft launch included the wrong person",
      "their breakup became a shared notes app",
      "the matching tattoos happened after one date",
      "everyone picked sides in under ten minutes",
    ],
  ),
  makeRow("celeb-drama", "celeb drama", "rgba(53, 221, 255, 0.42)", [
    "pap walk decoded frame by frame",
    "the apology video had a second microphone",
    "fans spotted the leaked casting sheet",
    "album rollout collapses in real time",
    "nobody believes the breakup statement",
    "that interview answer started another war",
  ]),
  makeRow(
    "internet-rabbit-holes",
    "internet rabbit holes",
    "rgba(119, 238, 255, 0.34)",
    [
      "the fake restaurant with real reviews",
      "this lost channel predicted its own ending",
      "the avatar game mystery from 2012",
      "niche forum post with terrifying replies",
      "the missing influencer side account",
      "map coordinates nobody can explain",
    ],
  ),
];

const genres = sections.slice(1).map((section) => ({
  id: section.id,
  label: section.label,
}));

function SlopflixMockup() {
  const [featuredVideo, setFeaturedVideo] = useState<VideoCard>(sections[0].vids[0]);
  const [activeGenre, setActiveGenre] = useState<string>(sections[1].id);
  const [queue, setQueue] = useState<string[]>([]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const inQueue = queue.includes(featuredVideo.id);

  const scrollRow = (sectionId: string, direction: -1 | 1) => {
    const row = rowRefs.current[sectionId];
    if (!row) return;

    const amount = Math.max(row.clientWidth - 120, 260);
    row.scrollBy({
      left: amount * direction,
      behavior: "smooth",
    });
  };

  const focusSection = (sectionId: string) => {
    const targetSection = sections.find((section) => section.id === sectionId);
    if (!targetSection) return;

    if (sectionId !== "top-vids") {
      setActiveGenre(sectionId);
    }

    setFeaturedVideo(targetSection.vids[0]);

    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleVideoSelect = (video: VideoCard) => {
    setFeaturedVideo(video);

    if (video.sectionId !== "top-vids") {
      setActiveGenre(video.sectionId);
    }
  };

  const toggleQueue = (videoId: string) => {
    setQueue((current) =>
      current.includes(videoId)
        ? current.filter((id) => id !== videoId)
        : [...current, videoId],
    );
  };

  return (
    <div
      ref={viewportRef}
      className="hide-scrollbar relative h-screen overflow-x-hidden overflow-y-auto bg-[#040404] font-sans text-white"
    >
      <AuraBackground />

      <div className="relative z-10 px-4 pb-24 sm:px-6 lg:px-10">
        <header className="sticky top-0 z-30 -mx-4 mb-6 border-b border-white/10 bg-black/30 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() =>
                  viewportRef.current?.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="text-3xl font-extrabold tracking-tight text-[#ff6f61] transition hover:text-[#ff867a]"
              >
                slopflix
              </button>

              <div className="hidden gap-4 text-sm md:flex">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => focusSection(genre.id)}
                    className={`transition ${
                      activeGenre === genre.id
                        ? "text-[#00e5ff]"
                        : "text-white/70 hover:text-[#00e5ff]"
                    }`}
                  >
                    {genre.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => focusSection("top-vids")}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              search slop...
            </button>
          </div>

          <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {genres.map((genre) => (
              <button
                key={`mobile-${genre.id}`}
                type="button"
                onClick={() => focusSection(genre.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition ${
                  activeGenre === genre.id
                    ? "border-[#00e5ff]/50 bg-[#00e5ff]/10 text-[#00e5ff]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </header>

        <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
          <button
            type="button"
            onClick={() => focusSection(featuredVideo.sectionId)}
            className="block w-full text-left"
          >
            <div
              className="h-[320px] sm:h-[420px] lg:h-[520px]"
              style={{
                background: `linear-gradient(135deg, ${featuredVideo.accent} 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.02) 100%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 z-20 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-2xl">
            <div className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/65">
              {featuredVideo.sectionLabel}
            </div>

            <div className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {featuredVideo.title}
            </div>

            <div className="mt-2 max-w-xl text-white/60">{featuredVideo.blurb}</div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => focusSection(featuredVideo.sectionId)}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90"
              >
                watch now
              </button>

              <button
                type="button"
                onClick={() => toggleQueue(featuredVideo.id)}
                className="rounded-full border border-white/15 bg-black/35 px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-white/30 hover:bg-black/45"
              >
                {inQueue ? "in queue" : "my queue"}
              </button>
            </div>
          </div>
        </section>

        {sections.map((section) => (
          <section
            key={section.id}
            ref={(node) => {
              sectionRefs.current[section.id] = node;
            }}
            className="mb-10 scroll-mt-28"
          >
            <div className="mb-3 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => focusSection(section.id)}
                className="text-left text-lg font-bold capitalize text-white/90 transition hover:text-white"
              >
                {section.label}
              </button>

              <div className="hidden text-xs uppercase tracking-[0.2em] text-white/35 sm:block">
                cards update the hero
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[#040404] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[#040404] to-transparent" />

              <ScrollArrow
                direction="left"
                label={`Scroll ${section.label} left`}
                onClick={() => scrollRow(section.id, -1)}
              />

              <div
                ref={(node) => {
                  rowRefs.current[section.id] = node;
                }}
                className="hide-scrollbar flex gap-4 overflow-x-auto px-10 pb-2 scroll-smooth sm:px-12"
              >
                {section.vids.map((video) => {
                  const selected = video.id === featuredVideo.id;
                  const queued = queue.includes(video.id);

                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleVideoSelect(video)}
                      className={`group relative h-32 min-w-[220px] flex-shrink-0 overflow-hidden rounded-xl border text-left transition ${
                        selected
                          ? "border-white/35 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
                          : "border-white/10 hover:-translate-y-0.5 hover:border-white/25"
                      }`}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${video.accent} 0%, rgba(255,255,255,0.02) 100%)`,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

                      <div className="absolute left-2 top-2 rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
                        {section.label}
                      </div>

                      {queued ? (
                        <div className="absolute right-2 top-2 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#9ef5ff]">
                          queued
                        </div>
                      ) : null}

                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-sm font-semibold text-white">{video.title}</div>
                        <div className="mt-1 text-xs text-white/55">{video.blurb}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <ScrollArrow
                direction="right"
                label={`Scroll ${section.label} right`}
                onClick={() => scrollRow(section.id, 1)}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ScrollArrow({
  direction,
  label,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute ${
        direction === "left" ? "left-2" : "right-2"
      } top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/50 text-white/80 backdrop-blur transition hover:scale-105 hover:border-white/25 hover:bg-black/65 hover:text-white`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`h-4 w-4 ${direction === "right" ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <path
          d="M15 19L8 12L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function AuraBackground() {
  const blobs = [
    {
      className: "left-[-12%] top-[-8%] h-[42rem] w-[42rem] bg-[#ff6f61]/46",
      animation: "blobFloat1 26s ease-in-out infinite",
    },
    {
      className: "left-[4%] top-[52%] h-[36rem] w-[36rem] bg-[#ff7b70]/34",
      animation: "blobFloat2 24s ease-in-out infinite",
    },
    {
      className: "left-[26%] top-[18%] h-[28rem] w-[28rem] bg-[#ff8c82]/28",
      animation: "blobFloat3 20s ease-in-out infinite",
    },
    {
      className: "right-[-10%] top-[0%] h-[42rem] w-[42rem] bg-[#00e5ff]/42",
      animation: "blobFloat4 28s ease-in-out infinite",
    },
    {
      className: "right-[2%] top-[48%] h-[38rem] w-[38rem] bg-[#35ddff]/34",
      animation: "blobFloat5 22s ease-in-out infinite",
    },
    {
      className: "right-[24%] top-[20%] h-[30rem] w-[30rem] bg-[#77eeff]/24",
      animation: "blobFloat6 18s ease-in-out infinite",
    },
  ];

  const hazeBlobs = [
    {
      className: "left-[18%] top-[8%] h-72 w-72",
      animation: "hazeFloat1 20s ease-in-out infinite",
    },
    {
      className: "right-[18%] top-[24%] h-80 w-80",
      animation: "hazeFloat2 17s ease-in-out infinite",
    },
    {
      className: "left-[42%] top-[58%] h-64 w-64",
      animation: "hazeFloat3 23s ease-in-out infinite",
    },
    {
      className: "right-[34%] top-[70%] h-72 w-72",
      animation: "hazeFloat4 19s ease-in-out infinite",
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className={`absolute rounded-full blur-[220px] mix-blend-screen will-change-transform ${blob.className}`}
          style={{ animation: blob.animation }}
        />
      ))}

      {hazeBlobs.map((blob, index) => (
        <div
          key={`haze-${index}`}
          className={`absolute rounded-full bg-white/14 blur-[140px] mix-blend-overlay will-change-transform ${blob.className}`}
          style={{ animation: blob.animation }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.18) 0.6px, transparent 0.6px)",
          backgroundSize: "4px 4px",
        }}
      />

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }

        @keyframes blobFloat1 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          20% { transform: translate3d(110px, 30px, 0) scale(1.08); }
          45% { transform: translate3d(70px, 130px, 0) scale(0.94); }
          70% { transform: translate3d(-90px, 90px, 0) scale(1.04); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloat2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-100px, -40px, 0) scale(1.05); }
          50% { transform: translate3d(40px, -150px, 0) scale(0.95); }
          75% { transform: translate3d(130px, -50px, 0) scale(1.04); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloat3 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          30% { transform: translate3d(90px, -70px, 0) scale(1.07); }
          60% { transform: translate3d(-50px, 110px, 0) scale(0.92); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloat4 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(-120px, 60px, 0) scale(1.06); }
          50% { transform: translate3d(-30px, 160px, 0) scale(0.94); }
          75% { transform: translate3d(80px, 80px, 0) scale(1.03); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloat5 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          25% { transform: translate3d(70px, -100px, 0) scale(1.05); }
          50% { transform: translate3d(-110px, -140px, 0) scale(0.94); }
          75% { transform: translate3d(-150px, -20px, 0) scale(1.06); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes blobFloat6 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          35% { transform: translate3d(-90px, 50px, 0) scale(1.08); }
          70% { transform: translate3d(60px, 120px, 0) scale(0.93); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }

        @keyframes hazeFloat1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(55px, 75px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes hazeFloat2 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-70px, 55px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes hazeFloat3 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(45px, -60px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        @keyframes hazeFloat4 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-55px, -45px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return <SlopflixMockup />;
}