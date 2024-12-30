import { IconBrandGithubFilled } from "@tabler/icons-react";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
      <header className="w-full bg-black flex justify-between items-center text-white px-8 py-4">
        <div className="text-white text-lg font-bold">
          Graph Visualizers
        </div>
        <a href="https://github.com/max172-hqt/algorithms-visualizers" target="_blank"><IconBrandGithubFilled /></a>
      </header>
      <main className="w-full h-full flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

export default Layout;
