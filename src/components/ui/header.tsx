import { auth, signOut } from "@/auth";
import { Button } from './button';
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";
import { getUser } from "@/auth/server";
import SignOutButton from "../SignOutButton";
import { getUserRole } from "@/app/actions/userSchoolRole";
import { Menu } from "lucide-react";

function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <Button type="submit" variant="ghost" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">Sign Out</Button>
        </form>
    );
}

const Header = async () => {
    const session = await auth();
    const regsession = await getUser();

    const userId = session?.user?.id;
    const regUserId = regsession?.id;
    const schoolRole = getUserRole({
      userId,
      regUserId
    });

    return (
        <header className="fixed top-0 left-0 w-full z-10 flex items-center px-4">
            <div className="flex-shrink-0">
                <Link href="/">
                    <Image src="/images/owl-icon-logo.png" width={80} height={80} alt="owl" />
                </Link>
            </div>
            <nav className="flex-grow flex justify-between items-center max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-bold text-white">Sami Quizzer AI</h1>
                <div className="flex-grow flex justify-end items-center">
                    {regsession ? (
                        <div className="flex flex-row items-center gap-5 mt-0 text-sm">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
                                        <Menu className="w-5 h-5" />
                                        <p className="ml-2">Menu</p>
                                    </Button>
                                </DropdownMenuTrigger>
                                <NavMenu />
                            </DropdownMenu>
                            <SignOutButton />
                        </div>
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            
                            {session.user.name && session.user.image && (
                                <>  
                                    <DropdownMenu>
                                            <DropdownMenuTrigger asChild>

                                                <Button variant="ghost" className="flex items-center text-white hover:bg-gray-700 p-2 rounded-md">
                                                    <Menu className="w-5 h-5" />
                                                    <p className="ml-2">Menu</p>
                                                </Button>


                                            </DropdownMenuTrigger>
                                            <NavMenu />
                                    </DropdownMenu>

                                    <Image
                                        src={session.user.image}
                                        alt={session.user.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full" />
                                    
                                </>
                            )}
                            <SignOut />
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button variant="link" className="rounded-xl border mr-2">Login</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
