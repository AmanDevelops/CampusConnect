import { useState, useCallback } from 'react';

export function useWallet() {
  const [address, setAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        const address = accounts[0];
        setAddress(address);
        setIsConnected(true);
        
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            setIsConnected(false);
            setAddress('');
          } else {
            setAddress(accounts[0]);
          }
        });

        return true;
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
        return false;
      }
    } else {
      alert('Please install MetaMask to connect your wallet!');
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress('');
    setIsConnected(false);
  }, []);

  return {
    connect,
    disconnect,
    address,
    isConnected
  };
}