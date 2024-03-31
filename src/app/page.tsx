import { LoginButton } from "@/components";

export default function Home() {
  return <div className="ml-auto bg-gray-200 mb-6 min-h-screen p-20 flex w-full flex-wrap justify-center items-center align-middle flex-col">
    <h1 className="text-2xl">Home page</h1>
    <div className="mt-4">
      <LoginButton />
    </div>
  </div>
}
