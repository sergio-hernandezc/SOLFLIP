use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{clock::Clock, Sysvar},
};
use std::hash::{Hasher, Hash};
use std::collections::hash_map::DefaultHasher;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let player_account = next_account_info(accounts_iter)?;

    if player_account.lamports() < 1_000_000_000 {
        msg!("Not enough SOL deposited!");
        return Err(ProgramError::InsufficientFunds);
    }

    // Get the current unix timestamp
    let clock = Clock::get()?;
    let timestamp = clock.unix_timestamp;

    // Use the transaction's signature (from instruction_data) and the timestamp to derive a pseudo-random value
    let mut hasher = DefaultHasher::new();
    hasher.write(instruction_data);
    hasher.write(&timestamp.to_le_bytes());
    let random_value = hasher.finish();

    // Use the derived value to determine heads or tails
    let coin_flip = random_value % 2;

    if coin_flip == 0 {
        msg!("Player wins!");
    } else {
        msg!("Player loses!");
    }

    Ok(())
}