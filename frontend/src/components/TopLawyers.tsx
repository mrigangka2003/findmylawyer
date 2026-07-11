import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { lawyers as fallbackLawyers } from "../data/data";
import { useLawyerStore } from "../store/useLawyerStore";

export default function TopLawyers() {
  const lawyers = useLawyerStore((state) => state.lawyers);
  const navigate = useNavigate();
  const displayedLawyers = (lawyers.length ? lawyers : fallbackLawyers).slice(0, 3);

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Selected network</p>
            <h2 className="font-display text-4xl leading-none text-white md:text-5xl">
              Meet the people behind the practice.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              navigate("/lawyers");
              window.scrollTo(0, 0);
            }}
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white"
          >
            Browse all lawyers
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {displayedLawyers.map((lawyer, index) => (
            <button
              type="button"
              key={lawyer._id}
              onClick={() => navigate(`/appointment/${lawyer._id}`)}
              className="group overflow-hidden border border-white/10 bg-[#101010] text-left transition hover:border-white/40"
            >
              <div className="relative aspect-[1.25] overflow-hidden bg-zinc-900">
                <img
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  src={lawyer.image}
                  alt={lawyer.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-black">
                  Select {index + 1}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-white">{lawyer.name}</p>
                    <p className="mt-1 text-xs text-zinc-300">{lawyer.speciality}</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center border border-white/25 bg-black/30 text-white transition group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-4 text-xs text-zinc-500">
                <span className="flex min-w-0 items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                  {lawyer.address.line1}
                </span>
                <span className="shrink-0 text-zinc-300">{lawyer.experience}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
