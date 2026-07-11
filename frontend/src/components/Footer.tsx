import { Link } from "react-router-dom";
import { ArrowUpRight, Scale } from "lucide-react";

const footerLinks = [
  { label: "Find a lawyer", path: "/lawyers" },
  { label: "About FindMyLawyer", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "My appointments", path: "/my-appointments" },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080808] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="flex items-center gap-2.5 text-sm font-bold tracking-[0.12em]">
              <span className="flex h-8 w-8 items-center justify-center border border-white/30 bg-white text-black">
                <Scale className="h-4 w-4" />
              </span>
              FINDMYLAWYER
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-500">
              Thoughtful legal connections, shaped around the matter in front of you.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="eyebrow mb-4">Navigate</p>
              <nav className="space-y-3">
                {footerLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="group flex w-fit items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white">
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <p className="eyebrow mb-4">A note on AI</p>
              <p className="text-sm leading-6 text-zinc-500">
                Matching supports your search. Your lawyer provides the legal advice.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-zinc-600 sm:flex-row">
          <span>© {new Date().getFullYear()} FindMyLawyer</span>
          <span>Legal help, made easier to begin.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
