import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { connectWallet } from '../features/wallet/walletThunk';
import { Button } from '@mui/material';

const ConnectWallet = () => {
    const dispatch = useAppDispatch()
  const { address, isConnected, error } = useAppSelector((state) => state.wallet);
  useEffect(() => {
    console.log(address)
    console.log(isConnected)
    console.log(error)
  }, [address, isConnected, error])

    return (
        <div>
        <div className="p-4">
        <p className="text-green-500">Wallet Connect Component  </p>
      {isConnected ? (
        <p className="text-green-500">Connected: {address.slice(0, 4)}...{address.slice(-6)}</p>
      ) : (
              <Button onClick={() => dispatch(connectWallet())} variant="contained">Connect Wallet</Button>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
        </div>
    );
}

export default ConnectWallet;
