import Link from "next/link";

// Placeholder wordmark logo — swap for the client's real logo file once provided.
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
      <span
        className={
          light
            ? "rounded-lg bg-accent-400 px-2 py-1 text-brand-900"
            : "rounded-lg bg-brand-600 px-2 py-1 text-white"
        }
      >
        SPM
      </span>
      <span className={light ? "text-white" : "text-brand-900"}>Fokus</span>
    </Link>
  );
}
