import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-gray-800 h-[100vh] justify-center">
      <h2 className="text-[1.5rem] mb-6 text-gray-300 text-center">
        Click the button below to open the <code className="text-blue-400">code editor</code>:
      </h2>
      <Link href="/editor">
        <Button
          className="text-[1.5rem] font-medium flex items-center gap-3 px-8 py-8 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Open Editor <FaExternalLinkAlt size={20} />
        </Button>
      </Link>
      <img src="/editorImage.png" alt="editor image" className="m-[2rem] w-[60%] border border-[0.5rem] border-gray-500 rounded-[24px]"/>
    </div>
  );
}
