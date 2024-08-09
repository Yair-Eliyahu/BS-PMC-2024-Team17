"use client";

import { loginAction } from "../actions/users"; 
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

// Google sign-in icon SVG
const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="2em"
    viewBox="0 0 256 262"
    fill="currentColor"
    className="mr-2"
  >
    <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/>
    <path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/>
    <path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/>
    <path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
  </svg>
);

function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClickLoginButton = (formData: FormData) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(formData);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Successfully Logged In");
        router.push("/");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-300 w-96 rounded-lg p-8">
        <h1 className="text-2xl text-center mb-8 text-white">Login</h1>

        <form
          className="flex flex-col gap-4"
          action={handleClickLoginButton}
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
          />

          <button
            className="rounded-lg p-2 mt-4 bg-black text-white flex justify-center"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          <Link href="../api/auth/signin">
            <Button
              variant="link"
              className="flex items-center justify-center rounded-lg p-2 mt-4 bg-white text-gray-800"
            >
              <GoogleIcon />
              Google Sign In
            </Button>
          </Link>
          <div className="mt-4">
            Dont have an account?{" "}
            <Link href="/create-account" className="underline text-black">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
