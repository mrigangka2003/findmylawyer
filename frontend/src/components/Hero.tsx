import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const suggestedMatters = [
  "Property dispute",
  "Family & divorce",
  "Business & contracts",
  "Criminal defence",
];

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const beginSearch = (matter = query) => {
    const value = matter.trim();
    navigate("/lawyers", { state: value ? { aiQuery: value } : undefined });
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#080808]">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[35rem] w-[55rem] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[90px]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4.75rem)] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-curated legal matches
          </div>

          <h1 className="max-w-3xl font-display text-5xl font-medium leading-[0.94] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
            The right legal mind.
            <span className="block text-zinc-500">Curated for your case.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            Describe what you are facing in plain language. We use your needs,
            location, and legal area to surface lawyers worth your time.
          </p>

          <div className="mt-10 border border-white/15 bg-[#101010] p-2 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5 text-xs text-zinc-500">
              <Search className="h-4 w-4" />
              Tell us about your legal matter
            </div>
            <div className="flex flex-col gap-2 p-2 sm:flex-row">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && beginSearch()}
                aria-label="Describe your legal matter"
                placeholder="e.g. I need help reviewing a rental agreement in Bengaluru"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600"
              />
              <button
                type="button"
                onClick={() => beginSearch()}
                className="group inline-flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Find my matches
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
              Try
            </span>
            {suggestedMatters.map((matter) => (
              <button
                type="button"
                key={matter}
                onClick={() => beginSearch(matter)}
                className="border border-white/10 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-white/40 hover:bg-white hover:text-black"
              >
                {matter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid max-w-2xl gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            {[
              "A considered shortlist, not a directory",
              "Verified profiles and transparent fees",
              "Book a consultation when ready",
            ].map((item) => (
              <div key={item} className="flex gap-2 text-xs leading-5 text-zinc-400">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
          <div className="absolute -left-8 top-16 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-9 right-8 h-24 w-24 border border-white/10 bg-white/[0.03]" />

          <div className="relative border border-white/15 bg-[#111] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.55)] sm:p-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-zinc-500">
                  Your AI shortlist
                </p>
                <h2 className="mt-2 font-display text-2xl text-white">A better starting point</h2>
              </div>
              <div className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white text-black">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3 py-5">
              {[
                { initials: "AK", name: "Adv. A. Khanna", detail: "Property & documentation", match: "98% match" },
                { initials: "RN", name: "Adv. R. Nair", detail: "Civil litigation", match: "94% match" },
                { initials: "SM", name: "Adv. S. Mehta", detail: "Commercial disputes", match: "91% match" },
              ].map((lawyer, index) => (
                <div key={lawyer.name} className="flex items-center gap-3 border border-white/10 bg-black/30 p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-zinc-200 text-xs font-bold text-black">
                    {lawyer.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{lawyer.name}</p>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">{lawyer.detail}</p>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-300">{lawyer.match}</span>
                  <span className="sr-only">Rank {index + 1}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-xs">
              <div className="flex items-center gap-2 text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-white" />
                Verified profiles
              </div>
              <div className="flex items-center justify-end gap-2 text-zinc-400">
                <MapPin className="h-4 w-4 text-white" />
                Near your city
              </div>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 border border-white/15 bg-white px-4 py-3 text-black shadow-xl sm:-left-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]">Match rationale</p>
            <p className="mt-1 text-xs text-zinc-700">Based on your matter, location & priority.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
