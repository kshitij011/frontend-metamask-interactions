import { useState } from 'react';
import {ethers} from 'ethers';
import { useEffect } from 'react';
function App() {
  // const [count, setCount] = useState(0)
  const {ethereum} = window;
  const [address, setAddress] = useState('Connect Wallet');
  const [balance, setBalance] = useState('0');

  useEffect(()=>{
    ethereum.on("accountsChanged", (accounts) => {
      setAddress(accounts[0]);
      const getBal = async() => {
        const balance = await ethereum.request({method: "eth_getBalance", params: [accounts[0], 'latest']})
        setBalance(ethers.formatEther(balance));
      }
      getBal();
    })
  },[])

  const changeNetwork = async() => {
    await ethereum.request(
      {method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x13882",
          chainName: "Amoy",
          rpcUrls: ["https://rpc-amoy.polygon.technology/"],
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://amoy.polygonscan.com/"]
        }]
      })
  }

  const requestAccount = async() => {
    // await ethereum.request({method: "wallet_requestPermissions", params:[{eth_accounts:{}}]});

    // printing connected wallets
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    console.log(accounts);
    setAddress(accounts[0]);

    // getting balance
    const bal = await ethereum.request({method: "eth_getBalance", params: [accounts[0], 'latest']})
    console.log(bal);
    setBalance(ethers.formatEther(bal));
  }
  return (
    <div className='items-center flex justify-center flex-col space-y-3 mt-40'>

      {/* connect account */}
      <div className="bg-red-500 px-5 py-2 text-center cursor-pointer rounded-md">
        <a className="text-3xl text-blue-400" onClick={requestAccount}>
          {address}
        </a>
      </div>

      {/* show account balalce */}
      <div className="bg-green-400 rounded-md px-5 py-2">
        <a className="text-3xl text-black text-center cursor-pointer">
          {balance}
        </a>
      </div>

      {/* change network button */}
      <button className='px-5 py-2 bg-gray-400 text-white text-2xl rounded-md' onClick={changeNetwork}>Switch network</button>
    </div>
  )
}

export default App
