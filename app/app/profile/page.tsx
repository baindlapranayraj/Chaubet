"use client";

import { useEffect, useRef, useState } from "react";
import { useProgram } from "@/functions/solanaSetup";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Loader2,
    User,
    Wallet,
    TrendingUp,
    Activity,
    RefreshCw,
    Trophy,
    Target,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ----------------- Types -----------------

interface BettorProfile {
    bettorPubkey: string;
    bettorName?: string;
    balance: number;
    bettorNetProfit: number;
    isBan: boolean;
}

type MarketStatus =
  | { open: Record<string, never> }
  | { closed: Record<string, never> }
  | { settled: Record<string, never> }
  | { unknown: Record<string, never> };

type MarketOutcome =
  | { yes: Record<string, never> }
  | { no: Record<string, never> }
  | { pending: Record<string, never> }
  | { unknown: Record<string, never> };


interface Wager {
    pubkey: string;
    marketPubkey: string;
    betAmountSpent: number;
    betAmountEarned: number;
    marketStatus: MarketStatus;
    marketOutcome: MarketOutcome;
    yesShares: number;
    noShares: number;
}

// ----------------- Helpers -----------------

const formatStatus = (status: MarketStatus) => {
    if ("open" in status) return "Open";
    if ("closed" in status) return "Closed";
    if ("settled" in status) return "Settled";
    return "Unknown";
};

const formatOutcome = (outcome: MarketOutcome) => {
    if ("yes" in outcome) return "Yes Wins";
    if ("no" in outcome) return "No Wins";
    if ("pending" in outcome) return "Pending";
    return "Unknown";
};

const getStatusColor = (status: MarketStatus) => {
    if ("open" in status)
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if ("closed" in status)
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    if ("settled" in status)
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

const getOutcomeColor = (outcome: MarketOutcome) => {
    if ("yes" in outcome)
        return "bg-green-500/20 text-green-400 border-green-500/30";
    if ("no" in outcome)
        return "bg-red-500/20 text-red-400 border-red-500/30";
    if ("pending" in outcome)
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-gray-500/20 text-gray-400 border-gray-500/30";
};

// ----------------- Component -----------------

export default function ProfilePage() {
    const { program } = useProgram();
    const { publicKey: walletKey } = useWallet();
    const hasFetched = useRef(false);

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<BettorProfile | null>(null);
    const [bets, setBets] = useState<Wager[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProfile = async (isRefresh = false) => {
        if (!program || !walletKey) return;

        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const [chauConfig] = PublicKey.findProgramAddressSync(
                [Buffer.from("admin_config")],
                program.programId
            );

            const [bettorProfile] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("bettor_profile"),
                    walletKey.toBuffer(),
                    chauConfig.toBuffer(),
                ],
                program.programId
            );
            const [bettorWallet] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("bettor_wallet"),
                    walletKey.toBuffer(),
                    chauConfig.toBuffer(),
                ],
                program.programId
            );
            const lamports = await program.provider.connection.getBalance(bettorWallet);


            // ----------------- Bettor -----------------
            const account = await program.account.bettor.fetch(bettorProfile);

            setProfile({
                bettorPubkey: account.bettorPubkey.toBase58(),
                bettorName: account.bettorName || undefined,
                balance: Number(lamports/LAMPORTS_PER_SOL),
                bettorNetProfit: Number(account.bettorNetProfit),
                isBan: account.isBan,
            });



            setProfile({
                bettorPubkey: account.bettorPubkey.toBase58(),
                bettorName: account.bettorName || undefined,
                balance: Number(account.balance),
                bettorNetProfit: Number(account.bettorNetProfit),
                isBan: account.isBan,
            });

            // ----------------- Wagers -----------------
            const allWagers = await program.account.wager.all([
                {
                    memcmp: {
                        offset: 8,
                        bytes: bettorProfile.toBase58(),
                    },
                },
            ]);

            const mapped: Wager[] = allWagers.map((w) => ({
                pubkey: w.publicKey.toBase58(),
                marketPubkey: w.account.marketPubkey.toBase58(),
                betAmountSpent: Number(w.account.betAmountSpent),
                betAmountEarned: Number(w.account.betAmountEarned),
                marketStatus: w.account.marketStatus as unknown as MarketStatus,
                marketOutcome: w.account.marketOutcome as MarketOutcome,
                yesShares: Number(w.account.yesShares),
                noShares: Number(w.account.noShares),
            }));

            setBets(mapped);

            if (isRefresh) toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error fetching profile or wagers:", error);
            toast.error("Failed to fetch profile or wagers.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (!program || !walletKey || hasFetched.current) return;
        hasFetched.current = true;
        fetchProfile();
    }, [program, walletKey]);

    if (!program)
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16  rounded-xl flex items-center justify-center mx-auto">
                        <Activity className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-slate-300 text-lg">Program not initialized.</p>
                </div>
            </div>
        );

    if (!walletKey)
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16  rounded-xl flex items-center justify-center mx-auto">
                        <Wallet className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-slate-300 text-lg">Connect your wallet to view profile.</p>
                </div>
            </div>
        );

    if (loading)
        return (
            <div className="min-h-screen  flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-20 h-20  rounded-2xl flex items-center justify-center">
                        <Loader2 className="h-10 w-10 animate-spin text-white" />
                    </div>
                    <div className="absolute inset-0  rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                </div>
                <p className="text-slate-300 text-lg font-medium">Loading your profile...</p>
            </div>
        );

    if (!profile)
        return (
            <div className="min-h-screen  flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                </div>
                <p className="text-slate-300 text-xl font-medium">Profile not found.</p>
            </div>
        );

    const totalWagers = bets.length;
    const totalSpent = bets.reduce((sum, bet) => sum + bet.betAmountSpent, 0);
    const totalEarned = bets.reduce((sum, bet) => sum + bet.betAmountEarned, 0);
    const winRate = totalWagers > 0 ? ((bets.filter(bet => bet.betAmountEarned > bet.betAmountSpent).length / totalWagers) * 100).toFixed(1) : '0';

    return (
        <div className=" mt-20">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
                        Betting Profile
                    </h1>
                    <p className="text-slate-400">Track your performance and betting history</p>
                </div>

                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Profile Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Main Profile Card */}
                        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                            <CardHeader className="pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white text-xl">
                                            {profile.bettorName || "Anonymous Bettor"}
                                        </CardTitle>
                                        <p className="text-slate-400 text-sm font-mono">
                                            {profile.bettorPubkey.slice(0, 8)}...{profile.bettorPubkey.slice(-8)}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">Current Balance</p>
                                        <p className="text-2xl font-bold text-white">{profile.balance} ◎</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-slate-400 text-sm">Net Profit</p>
                                        <p className={`text-2xl font-bold ${profile.bettorNetProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {profile.bettorNetProfit >= 0 ? '+' : ''}{profile.bettorNetProfit} ◎
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <Badge
                                        variant="outline"
                                        className={`${profile.isBan
                                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                                            : 'bg-green-500/20 text-green-400 border-green-500/30'
                                            }`}
                                    >
                                        <Activity className="w-3 h-3 mr-1" />
                                        {profile.isBan ? "Banned" : "Active"}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats Cards */}
                        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-blue-400" />
                                    <CardTitle className="text-slate-200 text-sm">Total Wagers</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-white">{totalWagers}</p>
                                <p className="text-slate-400 text-xs mt-1">Markets participated</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-400" />
                                    <CardTitle className="text-slate-200 text-sm">Win Rate</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-2xl font-bold text-white">{winRate}%</p>
                                <p className="text-slate-400 text-xs mt-1">Profitable bets</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Wagers Section */}
                    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <CardTitle className="text-white text-xl">Betting History</CardTitle>
                                </div>
                                <Button
                                    onClick={() => fetchProfile(true)}
                                    variant="outline"
                                    size="sm"
                                    disabled={refreshing}
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                                >
                                    {refreshing ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                    )}
                                    {refreshing ? 'Updating...' : 'Refresh'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {bets.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <p className="text-slate-400 text-lg mb-2">No wagers yet</p>
                                    <p className="text-slate-500 text-sm">Start betting to see your history here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Summary Stats */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                                        <div className="text-center">
                                            <p className="text-slate-400 text-sm">Total Spent</p>
                                            <p className="text-white font-semibold">{totalSpent.toFixed(2)} ◎</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-slate-400 text-sm">Total Earned</p>
                                            <p className="text-white font-semibold">{totalEarned.toFixed(2)} ◎</p>
                                        </div>
                                        <div className="text-center md:block hidden">
                                            <p className="text-slate-400 text-sm">P&L</p>
                                            <p className={`font-semibold ${(totalEarned - totalSpent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {(totalEarned - totalSpent) >= 0 ? '+' : ''}{(totalEarned - totalSpent).toFixed(2)} ◎
                                            </p>
                                        </div>
                                    </div>

                                    {/* Wager List */}
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {bets.map((wager) => (
                                            <div
                                                key={wager.pubkey}
                                                className="p-4 bg-slate-900/30 rounded-lg border border-slate-700/30 hover:bg-slate-900/50 transition-colors"
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="flex-1">
                                                        <p className="text-white font-medium text-sm mb-1">Market</p>
                                                        <p className="text-slate-400 text-xs font-mono break-all">
                                                            {wager.marketPubkey}
                                                        </p>
                                                    </div>
                                                    <div className="text-right ml-4">
                                                        <p className="text-white font-semibold">{wager.betAmountSpent} ◎</p>
                                                        <p className="text-slate-400 text-xs">Spent</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 mb-3">
                                                    <div>
                                                        <p className="text-slate-400 text-xs mb-1">Position</p>
                                                        <div className="flex gap-2">
                                                            {wager.yesShares > 0 && (
                                                                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                                                                    YES: {wager.yesShares}
                                                                </Badge>
                                                            )}
                                                            {wager.noShares > 0 && (
                                                                <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30 text-xs">
                                                                    NO: {wager.noShares}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-slate-400 text-xs mb-1">Earned</p>
                                                        <p className={`font-semibold ${wager.betAmountEarned > wager.betAmountSpent ? 'text-green-400' : 'text-slate-300'}`}>
                                                            {wager.betAmountEarned} ◎
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <Badge className={getStatusColor(wager.marketStatus)}>
                                                        {formatStatus(wager.marketStatus)}
                                                    </Badge>
                                                    <Badge className={getOutcomeColor(wager.marketOutcome)}>
                                                        {formatOutcome(wager.marketOutcome)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}