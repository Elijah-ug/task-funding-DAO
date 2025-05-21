import { getTokenContract } from "../../utils/contracts";
import tokenSlice, { setBalances, setError, setLoading } from "./tokenSlice"

export const fetchTokenBalance = () => async (dispatch, getState) => {
    try {
        dispatch(setLoading(true));
        const { wallet } = getState();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const token = await getTokenContract(provider);
        const balance = await token.balanceOf(wallet.address)
        dispatch(setBalances(balance.toString()))
    } catch (error) {
        dispatch(setError(error.message));
    }

}
