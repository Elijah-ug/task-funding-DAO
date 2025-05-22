import { ethers, formatUnits } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getDAOContract } from '../utils/contracts';

const RewardsInfo = ({taskId}) => {
    const [splits, setSplits] = useState({ doer: null, dao: null })
    const [ownerAddr, setOwnerAddr] = useState(null)
    useEffect(() => {
        const fetchSplits = async () => {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const dao = await getDAOContract(provider);
                const [doerAmount, daoAmount] = await dao.getRewardSplits(taskId)
                setSplits({
                    doer: ethers.formatUnits(doerAmount, 18),
                    dao: ethers.formatUnits(daoAmount, 18)
                })
            } catch (error) {
                console.log("Error in fetching rewards: ", error)
            }
        }
        fetchSplits()
    }, [taskId])
    return (
        <div>
            <div className="mt-2 text-sm text-gray-600">
              <p>👷 Doer Reward: {splits.doer} TOKEN</p>
              <p>🏛 DAO Reward: {splits.dao} TOKEN</p>
           </div>
        </div>
    );
}

export default RewardsInfo;
