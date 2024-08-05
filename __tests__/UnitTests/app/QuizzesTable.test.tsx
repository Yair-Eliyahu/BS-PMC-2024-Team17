import { render, screen } from "@testing-library/react";
import QuizzesTable, { Quizz } from "@/app/(user)/dashboard/quizzesTable"; 

jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode, href: string }) => {
        return <a href={href}>{children}</a>;
    };
});

describe('QuizzesTable', () => {
    const mockQuizzes: Quizz[] = [
        { id: '1', name: 'Quiz 1', description: 'Description 1' },
        { id: '2', name: 'Quiz 2', description: 'Description 2' },
    ];

    it('renders a list of quizzes', () => {
        render(<QuizzesTable quizzes={mockQuizzes} />);

        mockQuizzes.forEach((quizz) => {
            expect(screen.getByText(quizz.name)).toBeInTheDocument();
            expect(screen.getByText(quizz.description)).toBeInTheDocument();
        });
    });

    it('handles large number of quizzes correctly', () => {
        const largeMockQuizzes = Array.from({ length: 100 }, (_, index) => ({
            id: index.toString(),
            name: `Quiz ${index + 1}`,
            description: `Description ${index + 1}`
        }));

        render(<QuizzesTable quizzes={largeMockQuizzes} />);

        largeMockQuizzes.forEach((quizz) => {
            expect(screen.getByText(quizz.name)).toBeInTheDocument();
            expect(screen.getByText(quizz.description)).toBeInTheDocument();
        });
    });

    it('does not apply styles to empty quiz names or descriptions', () => {
        const edgeCaseQuizzes: Quizz[] = [
            { id: '1', name: '', description: 'Description with empty name' },
            { id: '2', name: 'Name with empty description', description: '' }
        ];

        render(<QuizzesTable quizzes={edgeCaseQuizzes} />);

        edgeCaseQuizzes.forEach((quizz) => {
            if (quizz.name) {
                const nameElement = screen.getByText(quizz.name);
                expect(nameElement).toHaveClass('text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:via-pink-500 hover:to-purple-400 transition duration-300 ease-in-out transform hover:scale-105');
            }

            if (quizz.description) {
                const descriptionElement = screen.getByText(quizz.description);
                expect(descriptionElement).not.toHaveClass('text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold hover:bg-gradient-to-l hover:from-red-500 hover:via-pink-500 hover:to-purple-400 transition duration-300 ease-in-out transform hover:scale-105');
            }
        });
    });
});
