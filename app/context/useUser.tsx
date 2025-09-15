"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

type UserContextType = {
  connected: boolean;
  publicKey: string | null;
};

const UserContext = createContext<UserContextType>({
  connected: false,
  publicKey: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { connected, publicKey } = useWallet();
  const [user, setUser] = useState<UserContextType>({
    connected: false,
    publicKey: null,
  });

  useEffect(() => {
    setUser({
      connected,
      publicKey: publicKey ? publicKey.toBase58() : null,
    });
  }, [connected, publicKey]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook for consuming
export const useUser = () => useContext(UserContext);
