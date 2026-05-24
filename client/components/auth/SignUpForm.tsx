"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";
import { setCurrentUser } from "@/redux/features/authSlice";

export default function SignUpForm() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });

      router.push("/auth/signin");
    } catch (err: any) {
      console.error(err.response?.data);

      setErrors(
        err.response?.data?.errors?.map(
          (error: any) => error.message
        ) || ["Something went wrong"]
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-3">
            Signup to continue
          </p>
        </div>

        {errors.length > 0 && (
          <div className="mb-5 bg-red-500/10 border border-red-500 rounded-xl p-4">
            <ul className="space-y-2">
              {errors.map((error, index) => (
                <li
                  key={index}
                  className="text-red-400 text-sm"
                >
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-xl
              bg-zinc-950
              border
              border-zinc-700
              px-4
              py-3
              text-white
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              rounded-xl
              bg-zinc-950
              border
              border-zinc-700
              px-4
              py-3
              text-white
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-semibold
              py-3
              rounded-xl
            "
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-400"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}