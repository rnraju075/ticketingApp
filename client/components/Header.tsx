"use client";

import Link from "next/link";
import axios from "axios";

import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setCurrentUser } from "@/redux/features/authSlice";

export default function Header() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(
    (state) => state.auth.currentUser
  );

  const handleSignout = async () => {
    try {
      await axios.post("/api/auth/signout");

      dispatch(setCurrentUser(null));

      router.push("/auth/signin");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500"
        >
          Ticketing
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {!currentUser && (
            <>
              <Link
                href="/signin"
                className="
                  text-zinc-300
                  hover:text-white
                  transition
                "
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="
                  text-zinc-300
                  hover:text-white
                  transition
                "
              >
                Sign Up
              </Link>
            </>
          )}

          {currentUser && (
            <>
              <span className="text-zinc-400">
                {currentUser.email}
              </span>

              <button
                onClick={handleSignout}
                className="
                  bg-red-600
                  hover:bg-red-500
                  px-4
                  py-2
                  rounded-xl
                  transition
                "
              >
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}