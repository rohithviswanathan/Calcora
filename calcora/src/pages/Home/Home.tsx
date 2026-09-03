import {
  ArrowRight,
  Calculator,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";

const highlights = [
  {
    icon: Calculator,
    title: "Everyday calculator",
    description:
      "Handle everyday calculations quickly with a clean, keyboard-friendly calculator built for speed and clarity.",
  },
  {
    icon: Sparkles,
    title: "More than basic math",
    description:
      "Use scientific calculations today, with finance, conversion, statistics, geometry, and more built into the workspace.",
  },
  {
    icon: Layers3,
    title: "One focused workspace",
    description:
      "Keep the tools you need in one place with a simple interface designed to stay out of your way.",
  },
];

function Home() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
      <div className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Calculation workspace
        </div>

        <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl lg:text-6xl">
          Calculate anything.
          <br />

          <span className="text-[var(--muted)]">
            Understand everything.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
          Calcora brings everyday calculations and specialized
          tools into one focused workspace designed for speed,
          clarity, and precision.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/calculator"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--foreground)] px-4 text-sm font-medium text-[var(--background)] transition-all hover:opacity-90"
          >
            Open calculator
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="group p-5 transition-colors hover:border-zinc-700"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)] transition-colors group-hover:text-[var(--foreground)]">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <h2 className="text-sm font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default Home;