import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { createContext, useCallback, useEffect, useState } from "react";

import {
  signOut as authSignout,
  client,
  getSession,
  onAuthStateChange,
} from "../../../api";

interface AuthContextType {
  session: Session;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  const signOut = useCallback(() => {
    authSignout()
      .then(() => {
        setSession(null);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
      setIsLoading(false);
    });

    const { unsubscribe } = onAuthStateChange((session) => {
      setSession(session);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <Auth
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        supabaseClient={client}
      />
    );
  } else {
    return (
      <AuthContext.Provider value={{ session, signOut }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export default AuthProvider;
