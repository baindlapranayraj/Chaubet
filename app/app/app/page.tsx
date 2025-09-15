"use client";

import { useEffect, useRef, useState } from "react";
import { useProgram } from "@/functions/solanaSetup";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wallet } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { PublicKey } from "@solana/web3.js";

type MarketState = "active" | "resolved" | "unknown";

interface Market {
  publicKey: PublicKey;
  account: {
    marketName: string;
    description: string;
    deadLine: number;
    marketState: MarketState;
    outcomeYesShares: number;
    outcomeNoShares: number;
  };
}

export default function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const { program } = useProgram();
  const { publicKey } = useWallet();
  const hasFetched = useRef(false);

  // 👇 Fetch markets when program is ready
  useEffect(() => {
    if (!program || hasFetched.current) return;

    const fetchMarkets = async () => {
      try {
        const fetched = await program.account.chauMarket.all();

        // Normalize and sort
        const normalized: Market[] = fetched
          .map((m) => ({
            publicKey: m.publicKey,
            account: {
              marketName: m.account.marketName.replace(/\0/g, ""),
              description: m.account.description,
              deadLine: m.account.deadLine?.toNumber() ?? 0,
              marketState:
                m.account.marketState?.active !== undefined
                  ? "active"
                  : m.account.marketState?.resolved !== undefined
                    ? "resolved"
                    : "unknown" as MarketState,
              outcomeYesShares: Number(m.account.outcomeYesShares) || 0,
              outcomeNoShares: Number(m.account.outcomeNoShares) || 0,
            },
          }))
          .sort((a, b) => a.account.deadLine - b.account.deadLine);

          console.log(normalized)

        setMarkets(normalized);

      } catch (error) {
        console.error("Error fetching markets:", error);
      } finally {
        setLoading(false);
      }
    };

    hasFetched.current = true;
    fetchMarkets();
  }, [program]);

  if (!program || !publicKey) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 rounded-2xl border-none shadow-lg text-center max-w-md">
          <CardHeader>
            <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <CardTitle className="text-xl font-semibold">
              Wallet Not Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Please connect your Solana wallet to view available markets.
            </p>
            <WalletMultiButton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-8 rounded-2xl border-none shadow-lg text-center max-w-md">
          <CardHeader>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground mb-2" />
            <CardTitle className="text-xl font-semibold">
              Loading Markets...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Fetching the latest prediction markets from the blockchain.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-32 px-24 md:px-24 lg:px-52">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {markets.length === 0 && (
          <Card className="col-span-full text-center p-8 rounded-2xl border-dashed border-2">
            <CardContent>
              <p className="text-muted-foreground">No markets found.</p>
            </CardContent>
          </Card>
        )}

        {markets.map((m) => {
          const deadline = new Date(
            m.account.deadLine * 1000
          ).toLocaleString();

          return (
            <Link
              key={m.publicKey.toBase58()}
              href={`/event/${m.publicKey.toBase58()}`}
              rel="noopener noreferrer"
              className="rounded-2xl shadow-md border border-border 
                bg-gradient-to-br from-background to-background 
                hover:from-accent/5 hover:to-primary/5 
                hover:border-primary/40 
                hover:shadow-lg hover:shadow-primary/20
                transition-all duration-300
                flex flex-col h-full cursor-pointer"
            >
              <Card className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold truncate">
                    {m.account.marketName}
                  </CardTitle>
                  <Badge
                    variant={m.account.marketState === "active" ? "default" : "outline"}
                    className="capitalize"
                  >
                    {m.account.marketState}
                  </Badge>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {m.account.description}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="font-medium">Deadline:</span>
                      <span className="text-muted-foreground">{deadline}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/event/${m.publicKey.toBase58()}`}
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Yes
                    </Link>
                    <Link
                      href={`/event/${m.publicKey.toBase58()}`}
                      rel="noopener noreferrer"
                      className="flex-1 px-3 py-2 rounded-xl bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      No
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
