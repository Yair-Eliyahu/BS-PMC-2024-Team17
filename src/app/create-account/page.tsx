"use client";

import React, { useState } from "react";
import { createAccountAction } from "../actions/users";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaLock } from "react-icons/fa";


function CreateAccountPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");

  const handleClickCreateAccountButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await createAccountAction(formData);

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        router.push("/");
        toast.success("Account Created!");
      }
    });
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }
    return "";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    const validationError = validatePassword(password);
    setPasswordError(validationError);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-300 w-full max-w-md rounded-lg p-8">
        <h1 className="text-2xl text-center mb-8 text-white">Create Account</h1>

        <form
          className="flex flex-col gap-4"
          action={handleClickCreateAccountButton}
          onSubmit={(e) => {
            if (passwordError) {
              e.preventDefault();
              toast.error(passwordError);
            }
          }}
        >
          <input
            type="email"
            name="email"
            className="rounded-lg p-2 text-black placeholder-black"
            placeholder="Email"
            disabled={isPending}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="rounded-lg p-2 text-black placeholder-black"
            disabled={isPending}
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <p className="text-red-500 text-sm p-2 mt-2 border border-red-500 rounded flex items-center">
              <FaLock className="mr-2" /> {passwordError}
            </p>
          )}
          <button
            className="rounded-lg p-2 mt-4 bg-black text-white flex justify-center"
            disabled={isPending || passwordError !== ""}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-white">
          Already have an account?{" "}
          <Link href="/login" className="underline text-black">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccountPage;
