import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Chaubet } from "@/lib/chaubet";
import idl from "@/lib/chaubet.json";



export function useProgram(): {
  program: Program<Chaubet> | null;
  provider: AnchorProvider | null;
} {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  if (!wallet) return { program: null, provider: null };

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  const program = new Program<Chaubet>(idl as Chaubet, provider);

  return { program, provider };
}
