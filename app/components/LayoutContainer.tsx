"use client";

import Header from "./Header";

export default function LayoutContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#9BC381] via-[#7BA862] to-[#5F8A48] overflow-x-hidden">
      <Header />
      <main className="pt-[80px] md:pt-[160px]">
        {children}
      </main>
    </div>
  );
}