import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchTokenBalance } from '../features/tokens/tokenThunk';

const TokenBalance = () => {
    const dispatch = useAppDispatch()
    const { address, isConnected } = useAppSelector((state) => state.wallet)
    const token = useAppSelector((state) => state.token || {})
    const { balance, loading, error } = token;

    useEffect(() => {
        if (isConnected && address) {
            dispatch(fetchTokenBalance())
        }
    })
    return (
        <div>
            <div className="p-4 border rounded mt-4">
              <h2 className="text-lg font-semibold mb-2">Your Token Balance:</h2>
              {loading && <p>Loading balance...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && !error && <p className="text-green-700">{balance} DTK</p>}
        </div>
    </div>

    );
}

export default TokenBalance;
