import { SET_TOTAL_POINTS } from './types';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
export const fetchWalletBalance = () => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const address = accounts[0];
          const balanceInWei = await web3.eth.getBalance(address);
          const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
          resolve(parseFloat(balanceInEther).toFixed(3)*10);
        } else {
          reject(new Error("No wallet connected."));
        }
      } else {
        reject(new Error("MetaMask is not available."));
      }
    } catch (err) {
      reject(err);
    }
  });
};

const initialState = {
    totalPoints: 0,
};  

fetchWalletBalance().then(balance => {
    initialState.totalPoints = balance;
}).catch(error => {
    console.error(error);
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOTAL_POINTS:
      return {
        ...state,
        totalPoints: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;