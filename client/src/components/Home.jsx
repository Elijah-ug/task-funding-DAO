import React from 'react';
import ConnectWallet from './ConnectWallet';
import WalletProvider from './WalletProvider';
import TokenBalance from './TokenBalance';

const Home = () => {
    return (
        <div>
            <ConnectWallet />
            <WalletProvider />
            <div className="balance">
                {/* <TokenBalance /> */}
             </div>
        </div>
    );
}

export default Home;
