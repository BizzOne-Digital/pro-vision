import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-[#EFF7FC] py-24">
      <div className="container-page text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#078BE7]">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold text-[#102A43] sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-[#627D98]">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to Home
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
