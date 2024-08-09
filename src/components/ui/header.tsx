import { auth, signOut } from "@/auth";
import { Button } from './button';
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";
import { getUser } from "@/auth/server";
import SignOutButton from "../SignOutButton";
import { getUserRole } from "@/app/actions/userSchoolRole";

function SignOut() {
    return (
        <form action={async () => {
            'use server';
            await signOut();
        }}>
            <Button type="submit" variant="ghost">Sign Out</Button>
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
                <h1 className="text-3xl font-bold text-black dark:text-white">Sami Quizzer AI</h1>
            
                
                <div className="flex items-center gap-4 mr-2">
                    {session?.user ? (
                        <>
                <h1 className="text-3xl font-bold text-white">Sami Quizzer AI</h1>

                <div className="flex-grow flex justify-end items-center">
                    {regsession ? (
                        <div className="flex flex-row items-center gap-2 mt-0 text-sm">
                            <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">
                                            <p className="text-white">{regsession.email}</p>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <NavMenu />
                                </DropdownMenu>
                            <SignOutButton />
                        </div>
                    ) : session?.user ? (
                        <div className="flex items-center gap-4">
                            {session.user.name && session.user.image && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <NavMenu />
                                </DropdownMenu>
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
