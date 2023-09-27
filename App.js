import React, { useState } from 'react'; 
import './App.css';
import WalletConnect from './WalletConnect';
import CoinFlip from './CoinFlip';

function App() {
  const [wallet, setWallet] = useState(null);
  return (
    <div className="App">
      <h1 className="title">SOLFLIP</h1>
      <h2 className="subheader">Try your luck with a 50/50 chance!</h2>
      <WalletConnect setWallet={setWallet}/>
      <CoinFlip wallet={wallet} /> 
    </div>
  );
}

export default App;
