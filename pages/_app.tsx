"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth/react/types";
import { useStore } from "@/store";
import { useEffect } from "react";

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
      <Component {...pageProps} />
    </SessionProvider>
  );
}