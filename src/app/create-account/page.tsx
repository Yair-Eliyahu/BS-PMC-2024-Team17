"use client";

import { createAccountAction } from "../actions/users"; 
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

function CreateAccountPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-blue-300 w-full max-w-md rounded-lg p-8">
        <h1 className="text-2xl text-center mb-8 text-white">Create Account</h1>

        <form
          className="flex flex-col gap-4"
          action={handleClickCreateAccountButton}
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
