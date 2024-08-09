import { createSupabaseClient } from "../auth/client";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

const Header = () => {
    const [user, setUser] = useState<User | null>(null);

    const { auth } = createSupabaseClient();
  
    auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return (
        <header>
            <nav className="px-4 py-2.5 flex gap-2">
                <Link className="underline" href={"/quizz"}>Sample Quizz</Link>
                <Link className="underline" href={"/quizz/new"}>New Quizz</Link>
                <p>{user?.email || "Not logged in"}</p>
            </nav>
        </header>
    )
}

export default Header;