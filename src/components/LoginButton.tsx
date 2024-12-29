import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { LoginModal } from './LoginModal';
import { useWallet } from '../hooks/useWallet';

export function LoginButton() {
  const [showModal, setShowModal] = useState(false);
  const { isConnected, connect } = useWallet();

  const handleLogin = async () => {
    if (!isConnected) {
      const connected = await connect();
      if (connected) {
        setShowModal(true);
      }
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-700 rounded-md hover:bg-indigo-800 transition-colors"
      >
        <LogIn className="h-5 w-5" />
        <span>Login</span>
      </button>
      
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
}