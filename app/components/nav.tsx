"use client"

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";


const Navbar = () => {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { publicKey } = useWallet()

    const navItems = [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Markets", href: "#markets" },
        { label: "Docs", href: "#docs" }
    ];
    const navItems2 = [
        { label: "Profile", href: `/profile` },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href={"/app"} className="cursor-pointer">

                        <div className="flex items-center">
                            <div className="text-2xl font-bold">
                                <span className="text-primary">Chau</span>
                                <span className="text-accent">bet</span>
                            </div>
                        </div></Link>

                    {/* Desktop Navigation */}
                    {pathname == "/" && (
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-4 cursor-pointer">
                        {pathname !== "/" ? (
                            <>
                                <nav className="hidden md:flex items-center space-x-8">
                                    {navItems2.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                                <WalletMultiButton />
                            </>
                        ) : (
                            <Link href="/app">
                                <Button variant="default" className="cursor-pointer">
                                    Launch App
                                </Button>
                            </Link>
                        )}
                    </div>



                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <nav className="flex flex-col space-y-4">
                            {pathname != "/" && (
                                <nav className="hidden md:flex items-center space-x-8">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </nav>
                            )}
                            <div className="flex flex-col space-y-2 pt-4">
                                <Button variant="default" className="justify-start">
                                    Launch App
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;