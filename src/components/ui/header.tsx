import { auth, signOut } from "@/auth";
import { Button } from './button';

const Header = async () => {
    const session = await auth();

    return (
        <header>
            <nav>
                <div>
                    <h1>Quizz AI</h1>
                </div>
            </nav>
        </header>
    )
}

export default Header;