"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { useStore } from "@/store";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";

interface AppProps {
  session: Session | null;
  Component: React.ComponentType<any>;
  pageProps: { [key: string]: any };
}

export default function App({ Component, pageProps, session }: AppProps) {
  const { setUser, user } = useStore();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session, setUser]);

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}