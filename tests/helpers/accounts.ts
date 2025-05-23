import { Program } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Chaubet } from "../../target/types/chaubet";
import { BanksClient } from "solana-bankrun";
import { TOKEN_PROGRAM_ID, unpackAccount } from "@solana/spl-token";

export async function fetchChauConfig(
  program: Program<Chaubet>,
  chauConfig: anchor.web3.PublicKey
) {
  try {
    return await program.account.chauConfig.fetch(chauConfig);
  } catch (error) {
    throw Error(`U got an error while fetching chauConfig ${error}`);
  }
}

export async function fetchChauMarket(
  program: Program<Chaubet>,
  chauMarket: anchor.web3.PublicKey
) {
  try {
    return await program.account.chauMarket.fetch(chauMarket);
  } catch (error) {
    throw Error(`U got an error while fetching chauMarket ${error}`);
  }
}

export async function fetchWagerPDA(
  program: Program<Chaubet>,
  wagerPDA: anchor.web3.PublicKey
) {
  try {
    return await program.account.wager.fetch(wagerPDA);
  } catch (error) {
    console.error(
      `Error while fetching Program Derived Accounts (PDAs): ${error}`
    );
  }
}

export async function fetchBettorProfile(
  program: Program<Chaubet>,
  bettorProfilePDA: anchor.web3.PublicKey
) {
  try {
    return await program.account.bettor.fetch(bettorProfilePDA);
  } catch (error) {
    console.error(`U got an error while fetching the bettor profile ${error}`);
  }
}

export async function getAccount(
  banksClient: BanksClient,
  address: anchor.web3.PublicKey,
  programId = TOKEN_PROGRAM_ID
) {
  const info = await banksClient.getAccount(address, "confirmed");
  return unpackAccount(
    address,
    info as anchor.web3.AccountInfo<Buffer>,
    programId
  );
}
