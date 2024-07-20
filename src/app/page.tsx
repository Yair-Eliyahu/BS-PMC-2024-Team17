import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    
    <div className="flex flex-col flex-1 mt-10">
      <main className="flex justify-center flex-1">
        <div className="items-center flex flex-col sm:flex-row gap-20 justify-end mx-auto p-10 w-full sm:py-10 sm:w-[1000px]">
          <div>
            <Image src="/images/owl-landing-no-bg.png" width="400" height="400" alt="owl" />
          </div>
          <div className="text-center flex gap-6 flex-col">
            <h1 className="text-3xl font-bold">Get quizzes about anything!</h1>
            <h3 className="text-sm">Upload documents, and easily generate quizzes with AI.</h3>
            <Link href="/quizz/new">
              <Button variant="neo" className="mt-4 h-14 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
