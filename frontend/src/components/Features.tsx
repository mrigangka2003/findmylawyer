import { BrainCircuit, CalendarCheck2, Scale, ShieldCheck, type LucideIcon } from "lucide-react";

type Feature = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

// Store icon component references, not JSX instances.
// This avoids creating new React elements at module-level on every evaluation.
const features: Feature[] = [
  {
    Icon: BrainCircuit,
    title: "Tell us the context",
    description:
      "Describe your issue in everyday language. There is no legal vocabulary test at the door.",
  },
  {
    Icon: Scale,
    title: "Get a focused shortlist",
    description:
      "AI helps weigh the legal area, city, experience and availability to make the search less noisy.",
  },
  {
    Icon: ShieldCheck,
    title: "Review with confidence",
    description:
      "Compare verified profiles, practice areas and consultation fees before you decide who to contact.",
  },
  {
    Icon: CalendarCheck2,
    title: "Book when it suits you",
    description:
      "Choose a time directly from a lawyer's availability and keep every appointment in one place.",
  },
];

const Features = () => {
  return (
    <section id="how-it-works" className="border-b border-white/10 bg-[#0d0d0d] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="max-w-xl font-display text-4xl leading-none text-white md:text-5xl">
              Finding counsel should feel considered, not overwhelming.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500 md:text-right">
            A clear path from a legal question to a person you can trust with it.
          </p>
        </div>

        <div className="grid divide-y divide-white/10 border-y border-white/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {features.map(({ Icon, title, description }, index) => (
            <div
              key={title}
              className="group min-h-[250px] p-7 transition-colors hover:bg-white hover:text-black lg:p-8"
            >
              <div className="mb-14 flex items-center justify-between">
                <span className="font-display text-2xl text-zinc-600 group-hover:text-zinc-500">0{index + 1}</span>
                <Icon className="h-5 w-5 text-zinc-400 transition group-hover:text-black" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-black">{title}</h3>
              <p className="text-sm leading-6 text-zinc-500 group-hover:text-zinc-700">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
