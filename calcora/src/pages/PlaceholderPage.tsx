interface PlaceholderPageProps {
  title: string;
  description: string;
}

function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex min-h-full max-w-6xl items-center px-6 py-12">
      <div>
        <p className="mb-2 text-sm text-[var(--muted)]">
          Coming next
        </p>

        <h1 className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>

        <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
      </div>
    </section>
  );
}

export default PlaceholderPage;