use anchor_lang::prelude::*;

declare_id!("BAYLRX7e4HzwqWu5tGTrUjAEjWEShxcAjbUzfxfnEwBu");

pub mod constant;
pub mod error;
pub mod instructions;
pub mod state;
pub mod utils;

use instructions::*;
use utils::*;

#[program]
pub mod chaubet {

    use crate::utils::MarketOutcome;

    use super::*;

    // Intializing the protocol config(only done by admin)
    pub fn initialize_config(ctx: Context<InitializeConfig>, fees: Option<u16>) -> Result<()> {
        ctx.accounts.init_config(ctx.bumps, fees)?;
        Ok(())
    }

    // Creating bettor profile
    pub fn initialize_bettor_account(
        ctx: Context<InitializeBettor>,
        amount_deposited: u64,
        name: Option<String>,
    ) -> Result<()> {
        ctx.accounts
            .init_bettor(name, amount_deposited, ctx.bumps)?;

        Ok(())
    }

    // Creats new market(only done by admin)
    pub fn create_market(
        ctx: Context<CreateMarket>,
        arg: MarketArg,
        metadata_arg: InitTokenArg,
    ) -> Result<()> {
        ctx.accounts
            .save_market_data(ctx.bumps, arg, metadata_arg)?;
        Ok(())
    }

    // Buy outcome shares
    pub fn buy_shares(ctx: Context<BuyShares>, shares_amount: u64, is_yes: bool) -> Result<()> {
        ctx.accounts.buy_shares(ctx.bumps, shares_amount, is_yes)?;
        Ok(())
    }

    // Trade/Sell your outcome shares
    pub fn sell_shares(ctx: Context<SellShares>, shares_amount: u64, is_yes: bool) -> Result<()> {
        // Take expected amount
        ctx.accounts.sell_shares(shares_amount, is_yes)?;
        Ok(())
    }

    // Resolving the market(only done by admin)
    pub fn resolve_market(ctx: Context<Resolve>, outcome: MarketOutcome) -> Result<()> {
        ctx.accounts.resolve_market(outcome)?;
        Ok(())
    }

    // Winner Bettors can claim there amount
    pub fn claim_bettor_amount(ctx: Context<ClaimAmount>, shares_amount: u64) -> Result<()> {
        ctx.accounts.claim_amount(shares_amount)?;
        Ok(())
    }

    // Admin collectes the fees(only done by admin)
    pub fn admin_withdraw_profit(ctx: Context<AdminWithdraw>) -> Result<()> {
        ctx.accounts.admin_withdraw_revenue()?;
        Ok(())
    }

    // Bettor withdraw amount from wallet
    pub fn bettor_withdraw_amount(ctx: Context<BettorWithdraw>) -> Result<()> {
        ctx.accounts.bettor_withdraw()?;
        Ok(())
    }

    // Ban bettor(only done by admin)
    pub fn ban_bettor(ctx: Context<Ban>) -> Result<()> {
        ctx.accounts.ban_bettor()?;
        Ok(())
    }
}
