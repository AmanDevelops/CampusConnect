import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export function WalletConnect() {
  const { connect, disconnect, address, isConnected } = useWallet();
  
  return (
    <button
      onClick={isConnected ? disconnect : connect}
      className="flex items-center space-x-2 px-4 py-2 bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
    >
      <Wallet className="h-5 w-5" />
      <span>
        {isConnected 
          ? `${address.slice(0, 6)}...${address.slice(-4)}`
          : 'Connect Wallet'}
      </span>
    </button>
  );
}