"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/hooks";

import { setCurrentUser } from "@/redux/features/authSlice";

export default function SigninPage() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);

    try {
      const response = await axios.post(
        "/api/auth/signin",
        {
          email,
          password,
        }
      );

      dispatch(
        setCurrentUser({
          email: response.data.email,
        })
      );

      router.push("/");
    } catch (err: any) {
      console.error(err.response?.data);

      setErrors(
        err.response?.data?.errors?.map(
          (error: any) => error.message
        ) || ["Invalid credentials"]
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="text-zinc-400 mt-3">
            Sign in to continue
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

        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >
          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
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
                outline-none
                focus:border-blue-500
              "
            />
          </div>

          <div>
            <label className="text-sm text-zinc-300 block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
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
                outline-none
                focus:border-blue-500
              "
            />
          </div>

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
              transition
            "
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}