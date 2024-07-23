"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ClipLoader from "react-spinners/ClipLoader";
import { useReward } from 'react-rewards';

const UploadDoc = () => {
    const [document, setDocument] = useState<File | null | undefined>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const { reward, isAnimating } = useReward('rewardId', 'emoji');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!document) {
            setError("Please upload the document first");
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append("pdf", document as Blob);

        try {
            const res = await fetch("/api/quizz/generate", {
                method: "POST",
                body: formData
            });

            if (res.status === 200) {
                const data = await res.json();
                const quizzId = data.quizzId;
                reward(); // Trigger the reward animation
                setTimeout(() => {
                    router.push(`/quizz/${quizzId}`);
                }, 1000); // Redirect after animation
            } else {
                const errorData = await res.json();
                setError(errorData.error || "An error occurred while generating the quiz");
            }
        } catch (e) {
            console.log("Error while generating", e);
            setError("An error occurred while generating the quiz");
        }
        setIsLoading(false);
    }

    return (
        <div className="w-full">
            {isLoading ? 
                <div className="flex justify-center items-center h-20">
                    <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
                </div> 
                : 
                <form className="w-full" onSubmit={handleSubmit}>
                    <label htmlFor="document" className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative">
                        <div className="absolute inset-0 m-auto flex justify-center items-center">
                            {document && document?.name ? document.name : "Drag a file"}
                        </div>
                        <input type="file" id="document" className="relative block w-full z-50 opacity-0" onChange={(e) => setDocument(e?.target?.files?.[0])} />
                    </label>
                    {error ? <p className="text-red-600">{error}</p> : null}
                    <Button size="lg" className="mt-2" type="submit" disabled={isLoading || isAnimating}>Generate Quiz 🧙✨</Button>
                </form>
            }
            <span id="rewardId" />
        </div>
    );
}

export default UploadDoc;
