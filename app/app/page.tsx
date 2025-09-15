"use client";

import Landing from "@/components/landing/Landing";
import { useUser } from "@/context/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { connected, publicKey } = useUser();
  useEffect(() => {
    if (connected) {
      router.push("/app");
    }
  }, [connected, router]);

  return (
    <div>
      {!connected && <Landing />}
    </div>
  );
}
