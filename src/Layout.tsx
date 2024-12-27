import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return <main className="bg-slate-800 min-h-screen w-full flex justify-center items-center">{children}</main>;
}

export default Layout;
