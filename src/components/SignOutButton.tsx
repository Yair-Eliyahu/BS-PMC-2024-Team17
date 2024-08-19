"use client";

import { signOutAction } from "@/app/actions/users"; 
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

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
    <Button
      onClick={handleClickSignOutButton}
      variant="ghost" 
      className="flex items-center text-black dark:text-white hover:bg-gray-700 p-2 rounded-md"
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
    </Button>
  );
}

export default SignOutButton;
