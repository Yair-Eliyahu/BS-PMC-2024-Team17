"use client";

import { signOutAction } from "@/app/actions/users"; 
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

function SignOutButton() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleClickSignOutButton = () => {
    startTransition(async () => {
      const { errorMessage } = await signOutAction();
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success("Successfully signed out");
        router.push("/");
      }
    });
  };

  return (
    <button
      onClick={handleClickSignOutButton}
      className="rounded-md p-1 text-black dark:text-white bg-transparent borderer text-sm flex items-center justify-center mr-2 hover:bg-gray-700"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : (
        <>
          <LogOut className="mr-2 w-4 h-4" />
          Sign Out
        </>
      )}
    </button>
  );
}

export default SignOutButton;
