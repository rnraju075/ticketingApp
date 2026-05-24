import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-black flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        <h1
          className="
            text-5xl
            md:text-7xl
            font-extrabold
            bg-linear-to-r
            from-blue-500
            to-cyan-400
            bg-clip-text
            text-transparent
          "
        >
          Ticketing Platform
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl mt-6">
          Secure microservices-based ticket marketplace built with
          Next.js, Kubernetes, Docker, and Node.js.
        </p>

        <div className="flex items-center justify-center gap-4 mt-10 flex-wrap">
          <Link
            href="/auth/signup"
            className="
              bg-blue-600
              hover:bg-blue-500
              px-8
              py-4
              rounded-2xl
              font-semibold
              transition
              shadow-lg
              shadow-blue-500/30
            "
          >
            Get Started
          </Link>

          <Link
            href="/auth/signin"
            className="
              border
              border-zinc-700
              hover:border-zinc-500
              px-8
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}