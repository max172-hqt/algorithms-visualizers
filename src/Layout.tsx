import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-black min-h-screen w-full flex flex-col">
      <header className="bg-black">
        <div className="w-full px-8 py-4 text-white text-lg font-bold">
          Graph Visualizers
        </div>
      </header>
      <main className="w-full h-full flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

export default Layout;
