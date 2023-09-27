import React, { useState, useEffect} from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, PublicKey } from '@solana/web3.js';

const network = "https://api.devnet.solana.com"; //use devnet for testing
const connection = new Connection(network);
const PROGRAM_ID = new PublicKey('CwmmLRNw9FzER2tyrrKxVhZnAK64pmdVYZMKyC8pmM6B');


function WalletConnect() {
    const [wallet, setWallet] = useState(null);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const wallet = new Wallet(network);
        setWallet(wallet);

        wallet.on('connect', async () => {
            setConnected(true);
            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance/1e9); //converts lamparts to SOL
        });

        wallet.on('disconnect',()=> {
            setConnected(false);
            setBalance(0);
        });

        return () => {
            wallet.disconnect();
        };
    }, []);

    const connectWallet = async () => {
        await wallet.connect();
    };

    const disconnectWallet = async () => {
        await wallet.disconnect();
    };

    return (
        <div>
            {!connected ? (
                <button onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <>
                    <div>Balance: {balance} SOL</div>
                    <button onClick={disconnectWallet}>Disconnect</button>
                </>
            )}
        </div>
    );
}

export default WalletConnect;