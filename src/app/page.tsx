import { auth } from "@/auth";
import { getUser } from "@/auth/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaSun, FaMoon, } from 'react-icons/fa';
import { getUserRole } from "./actions/userSchoolRole";
import { Check, UserCog, UserX } from "lucide-react";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  const regsession = await getUser();
  const regUserId = regsession?.id;

  const userRole = await getUserRole({ userId, regUserId });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { message: "Good Morning", icon: <FaSun size={24} className="text-yellow-500" /> };
    if (hour < 18) return { message: "Good Afternoon", icon: <FaSun size={24} className="text-orange-500" /> };
    if (hour < 22) return { message: "Good Evening", icon: <FaMoon size={24} className="text-blue-500" /> };
    return { message: "Good Night", icon: <FaMoon size={24} className="text-blue-900" /> };
  };

  const greeting = getGreeting();

  const greetingMessage = regsession
    ? `${greeting.message}, ${regsession.email}!`
    : session?.user?.email
    ? `${greeting.message}, ${session.user.email}!`
    : `Welcome to SamiQuizzer AI!`;

    if (userRole === "Manager") {
      return (
        <div className="flex flex-col flex-1 mt-20">
          <main className="flex justify-center flex-1">
            <div className="items-center flex flex-col sm:flex-row gap-20 justify-end mx-auto p-10 w-full sm:py-10 sm:w-[1000px]">
              <div>
                <Image src="/images/owl-landing-no-bg.png" width="400" height="400" alt="owl" />
              </div>
              <div className="text-center flex gap-6 flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{greetingMessage}</h1>
                  {greeting.icon}
                </div>
                <h1 className="text-3xl font-bold">Manage Your School!</h1>
                <h3 className="text-sm">Review Students Quizzes, Students Performances and Manage Users.</h3>
                <div className="flex justify-center gap-4 mt-6">
                  <Link href="/admin/delete-users" className="px-3 py-1 bg-purple-400 text-white rounded hover:bg-purple-500 transition duration-200 text-sm flex items-center gap-2">
                    <UserX className="w-4 h-8" />
                    Delete Users
                  </Link>
                  <Link href="/admin/manage-roles" className="px-3 py-1 bg-purple-400 text-white rounded hover:bg-purple-500 transition duration-200 text-sm flex items-center gap-2">
                    <UserCog className="w-4 h-8" />
                    Manage Roles
                  </Link>
                  <Link href="/admin/quizzes-done" className="px-3 py-1 bg-purple-400 text-white rounded hover:bg-purple-500 transition duration-200 text-sm flex items-center gap-2">
                    <Check className="w-4 h-8" />
                    Quizzes Done
                  </Link>
              </div>
              </div>
            </div>
          </main>
        </div>
      );
    }

      return (
        <div className="flex flex-col flex-1 mt-20">
          <main className="flex justify-center flex-1">
            <div className="items-center flex flex-col sm:flex-row gap-20 justify-end mx-auto p-10 w-full sm:py-10 sm:w-[1000px]">
              <div>
                <Image src="/images/owl-landing-no-bg.png" width="400" height="400" alt="owl" />
              </div>
              <div className="text-center flex gap-6 flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{greetingMessage}</h1>
                  {greeting.icon}
                </div>
                <h1 className="text-3xl font-bold">Get quizzes about anything!</h1>
                <h3 className="text-sm">Upload documents, and easily generate quizzes with AI.</h3>
                <Link href="/quizz/new">
                  <Button variant="neo" className="mt-4 h-14 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      );
}
