import { fetchTokenBalance } from "../tokens/tokenThunk";
import { setAddress, setDisconnect, setError } from "./walletSlice";
import {ethers} from "ethers"
export const connectWallet = () => async (dispatch) => {
    try {
        if (!window.ethereum) {
            // throw new Error("Metamask not installed");
            console.log("No metamast");
        }
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const address = accounts[0]
        console.log(" connected address: ", address)

        dispatch(setAddress(address));
        dispatch(setDisconnect(false));
        dispatch(fetchTokenBalance())

        //listen for account changes
        window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                dispatch(setAddress(accounts[0]))
                dispatch(fetchTokenBalance())
            } else {
                dispatch(setDisconnect(true))
            }
        })
    } catch (error) {
        dispatch(setError(error.message));
        console.log(" connected address: ", error)
    }
}
