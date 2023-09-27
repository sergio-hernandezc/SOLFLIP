
import React, { useState } from 'react'; 
import { Connection, Transaction, SystemProgram } from '@solana/web3.js';

import { PublicKey} from '@solana/web3.js';

const network = "https://api.devnet.solana.com";
const connection = new Connection(network); 
const PROGRAM_ID = new PublicKey('CwmmLRNw9FzER2tyrrKxVhZnAK64pmdVYZMKyC8pmM6B');

function CoinFlip({wallet}) {
    const [result, setResult] = useState(null);

    const handleFlip = async () => {
        if (!wallet || !wallet.connected) {
            alert("Please connect your wallet first!");
            return;
        }

        //check user balance
        const balance = await connection.getBalance(wallet.publicKey);
        if (balance < 1e9) { //1e9 = 1 sol
            alert("Not enough SOL to play!");
            return;
        }
        //TODO: send transaction to solana program to play
        let transaction = new Transaction().add(
            new Transaction({
                 keys: [{pubkey: wallet.publicKey, isSigner:true, isWritable:true}],
            programId: PROGRAM_ID,
            data: Buffer.from([]), //might need to pass some instruction data here
            })
        );

        transaction.recentBlockhash = (await connection.getLatestsBlockhash()).blockhash;

        transaction = await wallet.signTransaction(transaction);
        const txid = await connection.sendRawTransaction(transaction.serialize());
        const confirmation = await connection.confirm(txid);
        if (confirmation) {

        } else {

        }

        //TODO: check the result and update the UI
    };  

    return (
        <div>
            <button onClick={handleFlip}>Flip</button>
            {result && <div>Result: {result}</div>}
        </div>
    );
}

export default CoinFlip;