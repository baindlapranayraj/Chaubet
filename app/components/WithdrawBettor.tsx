"use client";

import { useState } from "react";
import { useProgram } from "@/functions/solanaSetup";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";

interface WithdrawButtonProps {
    bettorProfile: PublicKey;
    refreshProfile: () => Promise<void>;
}

export function WithdrawButton({ bettorProfile, refreshProfile }: WithdrawButtonProps) {
    const { program } = useProgram();
    const { publicKey: walletKey } = useWallet();
    const [loading, setLoading] = useState(false);

    const handleWithdraw = async () => {
        if (!program || !walletKey) {
            toast.error("Wallet not connected or program not ready.");
            return;
        }

        setLoading(true);
        try {
            // derive PDAs
            const [chauConfig] = PublicKey.findProgramAddressSync(
                [Buffer.from("admin_config")],
                program.programId
            );

            const [chauMarket] = PublicKey.findProgramAddressSync(
                [Buffer.from("market"), chauConfig.toBuffer(), Buffer.from("your_market_name_32bytes")],
                program.programId
            );

            const [wagerAccount] = PublicKey.findProgramAddressSync(
                [Buffer.from("bet"), chauMarket.toBuffer(), walletKey.toBuffer()],
                program.programId
            );

            const [bettorVaultAccount] = PublicKey.findProgramAddressSync(
                [Buffer.from("bettor_wallet"), walletKey.toBuffer(), chauConfig.toBuffer()],
                program.programId
            );

            // send tx
            await program.methods
                .bettorWithdrawAmount()
                .accounts({
                    bettor: walletKey,
                    // @ts-expect-error Program types may not include this PDA, but Anchor expects it
                    chauConfig,
                    chauMarket,
                    wagerAccount,
                    bettorWalletAccount: bettorVaultAccount,
                    bettorProfile,
                    systemProgram: PublicKey.default,
                })
                .rpc();

            toast.success("Withdrawal successful!");
            await refreshProfile();
        } catch (err) {
            // properly typed error
            const error = err as Error & { logs?: string[] };
            console.error("Withdraw error:", error);
            toast.error(error.message || "Failed to withdraw");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleWithdraw}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl"
        >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Withdraw Balance"}
        </Button>
    );
}
