'use client'

import { Button } from "@/components/ui"

const Home = () => {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <Button onClick={handleClick}>
          Welcome to the Home Page
        </Button>
      </main>
    </div>
  );
}

export default Home
