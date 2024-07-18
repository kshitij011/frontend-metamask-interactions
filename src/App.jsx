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
      setAddress(accounts[0])
      const getBal = async() => {
        const balance = await ethereum.request({method: "eth_getBalance", params: [accounts[0], 'latest']})
        setBalance(ethers.formatEther(balance));
      }
      getBal();
    })
  },[])

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
    <>
      <div className="bg-red-500">
        <a className="text-3xl text-blue-400 text-center cursor-pointer" onClick={requestAccount}>
          {address}
        </a>
      </div>
      <div className="bg-red-500">
        <a className="text-3xl text-blue-400 text-center cursor-pointer">
          {balance}
        </a>
      </div>
    </>
  )
}

export default App
