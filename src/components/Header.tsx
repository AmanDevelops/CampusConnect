import React from 'react';
import { Coins, Flame, Menu, LogIn } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { LoginButton } from './LoginButton';

interface HeaderProps {
  coins: number;
  streak: number;
}

export function Header({ coins, streak }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6 md:hidden" />
          <h1 className="text-2xl font-bold">TechCampus</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span className="font-semibold">{coins}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-400" />
            <span className="font-semibold">{streak} days</span>
          </div>
          <LoginButton />
          <WalletConnect />
        </div>
      </div>
    </header>
  );
}