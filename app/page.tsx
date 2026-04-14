function SlopflixMockup() {
  const genres = [
    "aitah",
    "scary stories",
    "relationship drama",
    "celeb drama",
    "internet rabbit holes",
  ];

  const makeRow = (label: string) => ({
    label,
    vids: Array.from({ length: 12 }, (_, i) => ({
      title: `${label} ${i + 1}`,
    })),
  });

  const sections = [
    makeRow("top vids"),
    makeRow("aitah"),
    makeRow("scary stories"),
    makeRow("relationship drama"),
    makeRow("celeb drama"),
    makeRow("internet rabbit holes"),
  ];

  return (
    <div className="relative min-h-screen overflow-y-auto bg-[#040404] text-white font-sans">
      <AuraBackground />

      <div className="relative z-10 px-4 pb-24 sm:px-6 lg:px-10">
        <header className="sticky top-0 z-30 -mx-4 mb-6 border-b border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-8">
              <div className="text-3xl font-extrabold tracking-tight text-[#ff6f61]">
                slopflix
              </div>
              <div className="hidden gap-4 text-sm md:flex">
                {genres.map((g) => (
                  <button key={g} className="text-white/70 transition hover:text-[#00e5ff]">
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
              search slop...
            </div>
          </div>
        </header>

        <section className="relative mb-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]">
          <div className="h-[320px] bg-white/5 sm:h-[420px] lg:h-[520px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-2xl">
            <div className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              insane reddit story that ruins your night
            </div>
            <div className="mt-2 text-white/60">based on a true post</div>
          </div>
        </section>

        {sections.map((section) => (
          <section key={section.label} className="mb-10">
            <div className="mb-3 text-lg font-bold capitalize text-white/90">
              {section.label}
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {section.vids.map((v, i) => (
                <article
                  key={`${section.label}-${i}`}
                  className="relative h-32 min-w-[200px] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-sm text-white/80">
                    {v.title}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
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
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[220px] mix-blend-screen will-change-transform ${blob.className}`}
          style={{ animation: blob.animation }}
        />
      ))}

      {hazeBlobs.map((blob, i) => (
        <div
          key={`haze-${i}`}
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
        @keyframes blobFloat1 {
          0% { transform: translate3d(0,0,0) scale(1); }
          20% { transform: translate3d(110px,30px,0) scale(1.08); }
          45% { transform: translate3d(70px,130px,0) scale(0.94); }
          70% { transform: translate3d(-90px,90px,0) scale(1.04); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blobFloat2 {
          0% { transform: translate3d(0,0,0) scale(1); }
          25% { transform: translate3d(-100px,-40px,0) scale(1.05); }
          50% { transform: translate3d(40px,-150px,0) scale(0.95); }
          75% { transform: translate3d(130px,-50px,0) scale(1.04); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blobFloat3 {
          0% { transform: translate3d(0,0,0) scale(1); }
          30% { transform: translate3d(90px,-70px,0) scale(1.07); }
          60% { transform: translate3d(-50px,110px,0) scale(0.92); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blobFloat4 {
          0% { transform: translate3d(0,0,0) scale(1); }
          25% { transform: translate3d(-120px,60px,0) scale(1.06); }
          50% { transform: translate3d(-30px,160px,0) scale(0.94); }
          75% { transform: translate3d(80px,80px,0) scale(1.03); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blobFloat5 {
          0% { transform: translate3d(0,0,0) scale(1); }
          25% { transform: translate3d(70px,-100px,0) scale(1.05); }
          50% { transform: translate3d(-110px,-140px,0) scale(0.94); }
          75% { transform: translate3d(-150px,-20px,0) scale(1.06); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes blobFloat6 {
          0% { transform: translate3d(0,0,0) scale(1); }
          35% { transform: translate3d(-90px,50px,0) scale(1.08); }
          70% { transform: translate3d(60px,120px,0) scale(0.93); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }
        @keyframes hazeFloat1 {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(55px,75px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes hazeFloat2 {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-70px,55px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes hazeFloat3 {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(45px,-60px,0); }
          100% { transform: translate3d(0,0,0); }
        }
        @keyframes hazeFloat4 {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(-55px,-45px,0); }
          100% { transform: translate3d(0,0,0); }
        }
      `}</style>
    </div>
  );
}

export default function Page() {
  return <SlopflixMockup />;
}