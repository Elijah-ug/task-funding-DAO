import {ethers} from "ethers"
import { DAO_CONTRACT_ADDRESS } from "../../config"
import DAO_ABI from "../abi/FirstDemoDAO.json"

import { DAO_TOKEN_ADDRESS } from "../../config"
import TOKEN_ABI from "../abi/FirstDemoToken.json"
export const getDAOContract = async (signer) => {
    return new ethers.Contract(DAO_CONTRACT_ADDRESS, DAO_ABI.abi, signer)
}

export const getTokenContract = async (signer) => {
    return new ethers.Contract(DAO_TOKEN_ADDRESS, TOKEN_ABI.abi, signer)
}
