"use client";

import { useEffect, useRef, useState } from "react";
import { useProgram } from "@/functions/solanaSetup";
import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wallet, Clock, TrendingUp, Users, AlertCircle } from "lucide-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { ComputeBudgetProgram, PublicKey, Transaction } from "@solana/web3.js";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import BN from "bn.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import * as anchor from "@coral-xyz/anchor"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MarketState {
    active?: Record<string, never>;
    resolved?: Record<string, never>;
}

interface Market {
    publicKey: string;
    account: {
        marketName: string;
        description: string;
        deadLine: number;
        marketState: MarketState;
        outcomeYesShares: number;
        outcomeNoShares: number;
    };
}

export default function EventPage() {
    const { publicKey: walletKey } = useWallet();
    const params = useParams();
    const publicKeyParam = Array.isArray(params.publicKey) ? params.publicKey[0] : params.publicKey;
    const { program } = useProgram();
    const [market, setMarket] = useState<Market | null>(null);
    const [loading, setLoading] = useState(true);
    const [transactionLoading, setTransactionLoading] = useState(false);
    const [amount, setAmount] = useState<string>("");
    const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes");
    const hasFetched = useRef(false);
    const hasProfileFetched = useRef(false);
    const [timeFrame, setTimeFrame] = useState<'1h' | '24h' | '7d'>('24h');
    const [hasBettorProfile, setHasBettorProfile] = useState<boolean | null>(null);
    const [showCreateBettorModal, setShowCreateBettorModal] = useState(false);
    const [bettorName, setBettorName] = useState("");
    const [initialDeposit, setInitialDeposit] = useState("");
    const [error, setError] = useState<string | null>(null);

    const checkBettorProfile = async () => {
        if (!program || !walletKey || hasProfileFetched.current) return false;

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

        try {
            const profile = await program.account.bettor.fetch(bettorProfile);
            return !!profile;
        } catch (err) {
            console.log(err)
            return false;
        }
    };

    useEffect(() => {
        if (!program || !publicKeyParam || hasFetched.current) return;

        let marketPubkey: PublicKey;
        try {
            marketPubkey = new PublicKey(publicKeyParam);
        } catch {
            setError("Invalid market address");
            setLoading(false);
            return;
        }

        const fetchMarket = async () => {
            try {
                const fetched = await program.account.chauMarket.fetch(marketPubkey);
                if (!fetched) {
                    setError("Market not found");
                    return;
                }

                setMarket({
                    publicKey: publicKeyParam,
                    account: {
                        marketName: fetched.marketName,
                        description: fetched.description,
                        deadLine: fetched.deadLine?.toNumber() ?? 0,
                        marketState: fetched.marketState,
                        outcomeYesShares: Number(fetched.outcomeYesShares) || 0,
                        outcomeNoShares: Number(fetched.outcomeNoShares) || 0,
                    },
                });
                hasFetched.current = true;
                setError(null);

            } catch (error) {
                console.error("Error fetching market:", error);
                setError("Failed to load market data");
            } finally {
                setLoading(false);
            }
        };

        fetchMarket();
    }, [program, publicKeyParam]);

    const validateBettorInput = () => {
        if (!bettorName.trim()) {
            toast.error("Please enter a username");
            return false;
        }
        if (bettorName.length < 3) {
            toast.error("Username must be at least 3 characters");
            return false;
        }
        if (!initialDeposit || parseFloat(initialDeposit) <= 0) {
            toast.error("Please enter a valid deposit amount");
            return false;
        }
        if (parseFloat(initialDeposit) < 0.001) {
            toast.error("Minimum deposit is 0.001 SOL");
            return false;
        }
        return true;
    };

    const handleCreateBettor = async () => {
        if (!walletKey || !program || !validateBettorInput()) return;

        setTransactionLoading(true);

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

            const [bettorVaultAccount] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from("bettor_wallet"),
                    walletKey.toBuffer(),
                    chauConfig.toBuffer(),
                ],
                program.programId
            );

            const tx = await program.methods
                .initializeBettorAccount(
                    new BN(Math.floor(parseFloat(initialDeposit))),
                    bettorName.trim()
                )
                .accountsStrict({
                    bettor: walletKey,
                    chauConfig,
                    bettorProfile,
                    bettorWalletAccount: bettorVaultAccount,
                    systemProgram: anchor.web3.SystemProgram.programId,
                })
                .rpc();

            toast.success("Account created successfully!");
            setShowCreateBettorModal(false);
            setHasBettorProfile(true);
            setBettorName("");
            setInitialDeposit("");

        } catch (error) {
            console.error(error);
            toast.error("Failed to create account. Please try again.");
        } finally {
            setTransactionLoading(false);
        }
    };

    const validateTradeInput = () => {
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return false;
        }
        if (parseFloat(amount) < 0.001) {
            toast.error("Minimum trade amount is 0.001 SOL");
            return false;
        }
        return true;
    };

    const handleBuy = async (side: "yes" | "no") => {
        if (!walletKey || !program || !validateTradeInput()) return;

        // Check bettor profile directly
        const exists = await checkBettorProfile();
        setHasBettorProfile(exists);

        if (!exists && !showCreateBettorModal) {
            setShowCreateBettorModal(true);
            return;
        }

        setTransactionLoading(true);

        try {
            const marketPubkey = new PublicKey(market!.publicKey);
            const [chauConfig] = PublicKey.findProgramAddressSync(
                [Buffer.from("admin_config")],
                program.programId
            );

            const [mintYes] = PublicKey.findProgramAddressSync(
                [Buffer.from("mint_yes"), marketPubkey.toBuffer()],
                program.programId
            );
            const [mintNo] = PublicKey.findProgramAddressSync(
                [Buffer.from("mint_no"), marketPubkey.toBuffer()],
                program.programId
            );
            const [bettorProfile] = PublicKey.findProgramAddressSync(
                [Buffer.from("bettor_profile"), walletKey.toBuffer(), chauConfig.toBuffer()],
                program.programId
            );

            const [chauMarket] = PublicKey.findProgramAddressSync(
                [Buffer.from("market"), chauConfig.toBuffer(), Buffer.from(market!.account.marketName)],
                program.programId
            );
            const [chauMarketVault] = PublicKey.findProgramAddressSync(
                [Buffer.from("market_vault"), chauMarket.toBuffer()],
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

            const bettorYesATA = await getAssociatedTokenAddress(
                mintYes,
                walletKey,
                false,
                anchor.utils.token.TOKEN_PROGRAM_ID,
                anchor.utils.token.ASSOCIATED_PROGRAM_ID
            );
            const bettorNoATA = await getAssociatedTokenAddress(
                mintNo,
                walletKey,
                false,
                anchor.utils.token.TOKEN_PROGRAM_ID,
                anchor.utils.token.ASSOCIATED_PROGRAM_ID
            );

            const sharesAmount = new BN(Math.floor(parseFloat(amount)));
            const shareSide = side === "yes" ? true : false;
            const provider = program.provider as anchor.AnchorProvider;


            const ix = await program.methods
                .buyShares(sharesAmount, shareSide)
                .accountsStrict({
                    bettor: walletKey,
                    bettorYesAccount: bettorYesATA,
                    bettorNoAccount: bettorNoATA,
                    bettorProfile,
                    bettorWalletAccount: bettorVaultAccount,
                    wagerAccount,
                    chauMarket: marketPubkey,
                    marketVaultAccount: chauMarketVault,
                    mintYes,
                    mintNo,
                    chauConfig,
                    systemProgram: anchor.web3.SystemProgram.programId,
                    tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
                    associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
                })
                .instruction(); // build instruction, don’t send yet

            const computeIx = ComputeBudgetProgram.setComputeUnitLimit({
                units: 500_000,
            });

            const tx = new Transaction().add(computeIx, ix);

            const txSig = await provider.sendAndConfirm(tx, []);


            toast.success(`Trade executed successfully! ${txSig}`);

            setMarket(prev =>
                prev
                    ? {
                        ...prev,
                        account: {
                            ...prev.account,
                            outcomeYesShares:
                                side === "yes"
                                    ? prev.account.outcomeYesShares + parseFloat(amount)
                                    : prev.account.outcomeYesShares,
                            outcomeNoShares:
                                side === "no"
                                    ? prev.account.outcomeNoShares + parseFloat(amount)
                                    : prev.account.outcomeNoShares,
                        },
                    }
                    : prev
            );

            setAmount("");
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message.includes("insufficient funds")) {
                    toast.error("Insufficient funds for this trade");
                } else if (error.message.includes("slippage")) {
                    toast.error("Price changed. Please try again.");
                } else {
                    toast.error("Trade failed. Please try again.");
                }
            } else {
                toast.error("Unexpected error occurred");
            }
        } finally {
            setTransactionLoading(false);
        }
    };



    if (!program || !walletKey) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="p-8 rounded-2xl shadow-lg text-center max-w-md">
                <CardHeader>
                    <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                    <CardTitle className="text-xl font-semibold">Connect Your Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Connect your wallet to start trading on this prediction market.
                    </p>
                    <WalletMultiButton />
                </CardContent>
            </Card>
        </div>
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading market data...</p>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-destructive font-medium">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
                Retry
            </button>
        </div>
    );

    if (!market) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <p className="text-center text-muted-foreground">Market not found</p>
        </div>
    );

    const { marketName, description, marketState, outcomeYesShares, outcomeNoShares, deadLine } = market.account;

    const yesShares = Number(outcomeYesShares) || 0;
    const noShares = Number(outcomeNoShares) || 0;
    const totalShares = yesShares + noShares;
    const yesPrice = totalShares ? yesShares / totalShares : 0.5;
    const noPrice = totalShares ? noShares / totalShares : 0.5;
    const safeYesPrice = yesPrice > 0 ? yesPrice : 1;
    const safeNoPrice = noPrice > 0 ? noPrice : 1;
    const isOpen = !!marketState.active;

    const timeRemaining = deadLine ? Math.max(0, deadLine - Date.now() / 1000) : 0;
    const daysRemaining = Math.floor(timeRemaining / 86400);
    const hoursRemaining = Math.floor((timeRemaining % 86400) / 3600);

    const chartData = timeFrame === '1h'
        ? [yesPrice, yesPrice * 0.98, yesPrice * 1.02, yesPrice, yesPrice * 1.01, yesPrice]
        : timeFrame === '7d'
            ? [yesPrice * 0.9, yesPrice * 0.95, yesPrice, yesPrice * 1.05, yesPrice * 0.98, yesPrice]
            : [yesPrice, yesPrice, yesPrice, yesPrice, yesPrice, yesPrice];

    return (
        <div className="mt-34 px-6 lg:px-24 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-background/50 rounded-2xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl pl-10 font-bold">{marketName.replace(/_/g, " ")}</h2>
                        <div className="flex items-center gap-4 pl-10 mt-2">
                            {timeRemaining > 0 && (
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{daysRemaining}d {hoursRemaining}h remaining</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                <span>{totalShares.toFixed(0)} total volume</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <TrendingUp className="h-4 w-4" />
                                <span>{((yesPrice - 0.5) * 100).toFixed(1)}% trend</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {(['1h', '24h', '7d'] as const).map((tf) => (
                            <button
                                key={tf}
                                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${timeFrame === tf
                                    ? 'bg-primary text-white'
                                    : 'bg-background/30 text-muted-foreground hover:bg-background/50'
                                    }`}
                                onClick={() => setTimeFrame(tf)}
                            >
                                {tf}
                            </button>
                        ))}
                    </div>
                </div>
                <Chart
                    options={{
                        chart: { id: "market-chart", toolbar: { show: true }, zoom: { enabled: false } },
                        colors: ["#10b981", "#ef4444"],
                        stroke: { width: [3, 0], curve: "smooth" },
                        plotOptions: { bar: { columnWidth: "60%", borderRadius: 4 } },
                        tooltip: {
                            shared: true,
                            intersect: false,
                            theme: "dark",
                            y: { formatter: (val: number) => `${(val * 100).toFixed(2)}%` },
                        },
                        xaxis: {
                            categories: ["0", "1", "2", "3", "4", "5"],
                            labels: { style: { colors: "#cbd5e1" } }
                        },
                        yaxis: {
                            title: { text: "Yes Price (%)", style: { color: "#10b981" } },
                            min: 0,
                            max: 1,
                            tickAmount: 5,
                            labels: {
                                formatter: (val: number) => `${(val * 100).toFixed(0)}%`
                            }
                        },
                        legend: { show: true, position: "top" },
                        grid: { borderColor: "#374151" },
                    }}
                    series={[{ name: "Yes Price", type: "line", data: chartData }]}
                    type="line"
                    height={350}
                />
            </div>

            <div className="w-full lg:w-1/3 bg-background/50 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-2">{market.account.marketName.replace(/_/g, " ")}</h2>
                        <Badge variant={isOpen ? "default" : "outline"} className="mb-3">
                            {isOpen ? "Active" : "Closed"}
                        </Badge>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{market.account.description}</p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Yes Price</div>
                        <div className="text-lg font-bold text-primary">
                            {(yesPrice * 100).toFixed(1)}%
                        </div>
                    </div>
                    <div className="bg-destructive/10 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">No Price</div>
                        <div className="text-lg font-bold text-destructive">
                            {(noPrice * 100).toFixed(1)}%
                        </div>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Liquidity:</span>
                        <span className="font-medium">{totalShares.toFixed(2)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Yes Volume:</span>
                        <span className="font-medium">{yesShares.toFixed(2)} SOL</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">No Volume:</span>
                        <span className="font-medium">{noShares.toFixed(2)} SOL</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        disabled={transactionLoading || !isOpen}
                        onClick={() => setSelectedSide("yes")}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedSide === "yes"
                            ? "bg-primary text-white shadow-lg"
                            : "bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"}`}
                    >
                        Yes {selectedSide === "yes" && `${(yesPrice * 100).toFixed(1)}%`}
                    </button>
                    <button
                        disabled={transactionLoading || !isOpen}
                        onClick={() => setSelectedSide("no")}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedSide === "no"
                            ? "bg-destructive text-white shadow-lg"
                            : "bg-destructive/10 text-destructive hover:bg-destructive/20 disabled:opacity-50"}`}
                    >
                        No {selectedSide === "no" && `${(noPrice * 100).toFixed(1)}%`}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type="number"
                        placeholder="Enter amount in SOL"
                        className="w-full p-3 rounded-lg border border-border bg-background text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled={transactionLoading || !isOpen}
                        min="0.001"
                        step="0.001"
                    />
                    <div className="absolute right-3 top-3 text-sm text-muted-foreground">
                        SOL
                    </div>
                </div>

                {amount && parseFloat(amount) > 0 && (
                    <div className="bg-muted/50 p-3 rounded-lg text-sm">
                        <div className="flex justify-between">
                            <span>You pay:</span>
                            <span className="font-medium">{parseFloat(amount).toFixed(3)} SOL</span>
                        </div>
                        <div className="flex justify-between">
                            <span>You get:</span>
                            <span className="font-medium">
                                ~~{(parseFloat(amount) / (selectedSide === "yes" ? safeYesPrice : safeNoPrice)).toFixed(2)} shares
                            </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Potential return:</span>
                            <span>
                                {selectedSide === "yes"
                                    ? `${((1 / safeYesPrice - 1) * 100).toFixed(1)}%`
                                    : `${((1 / safeNoPrice - 1) * 100).toFixed(1)}%`
                                }

                            </span>
                        </div>
                    </div>
                )}

                <button
                    disabled={transactionLoading || !amount || parseFloat(amount) <= 0 || !isOpen}
                    onClick={() => handleBuy(selectedSide)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${selectedSide === "yes"
                        ? "bg-primary text-white hover:bg-primary/90 disabled:bg-primary/50"
                        : "bg-destructive text-white hover:bg-destructive/90 disabled:bg-destructive/50"
                        } disabled:cursor-not-allowed`}
                >
                    {transactionLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Buy ${selectedSide === "yes" ? "Yes" : "No"} Position`
                    )}
                </button>

                {!isOpen && (
                    <div className="bg-muted/50 p-3 rounded-lg text-center text-sm text-muted-foreground">
                        This market is closed for trading
                    </div>
                )}
            </div>

            {showCreateBettorModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background p-6 rounded-xl shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-center">Create Your Trading Account</h2>
                        <p className="text-sm text-muted-foreground mb-4 text-center">
                            You need to create a bettor account before you can start trading
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    value={bettorName}
                                    onChange={(e) => setBettorName(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                    maxLength={20}
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {bettorName.length}/20 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Initial Deposit (SOL)</label>
                                <input
                                    type="number"
                                    placeholder="0.001"
                                    value={initialDeposit}
                                    onChange={(e) => setInitialDeposit(e.target.value)}
                                    className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
                                    min="0.001"
                                    step="0.001"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    Minimum: 0.001 SOL
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowCreateBettorModal(false);
                                    setBettorName("");
                                    setInitialDeposit("");
                                }}
                                className="flex-1 px-4 py-2 border border-border rounded-xl hover:bg-muted/50 transition-colors"
                                disabled={transactionLoading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateBettor}
                                className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                                disabled={!bettorName.trim() || !initialDeposit || transactionLoading}
                            >
                                {transactionLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}