import React, { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { ethers } from "ethers";
import { setAddress } from '../features/wallet/walletSlice';

const WalletProvider = ({children}) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const initWallet = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts", []);
                dispatch(setAddress(accounts[0]));

                window.ethereum.on("accountsChanged", (account) => {
                    dispatch(setAddress(account[0]));
                })
            }
        }
        initWallet()
    }, [dispatch])

    return ( <div> { children } </div> );
}
export default WalletProvider;
