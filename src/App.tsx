import { useState } from 'react';
import { Header } from './components/Header';
import { ActivityCard } from './components/ActivityCard';
import { Carousel } from './components/Carousel';
import { Activity, User } from './types';
import { ethers } from "ethers";


const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'Blockchain Development Club',
    description: 'Weekly meetup to discuss and build blockchain projects. Perfect for beginners and experts alike.',
    date: 'Every Thursday',
    type: 'club',
    coinsReward: 50
  },
  {
    id: '2',
    title: 'AI/ML Workshop Series',
    description: 'Learn the fundamentals of AI and Machine Learning through hands-on workshops.',
    date: 'Starting March 15',
    type: 'academic',
    coinsReward: 75
  },
  {
    id: '3',
    title: 'CryptoHack 2024',
    description: 'Annual blockchain hackathon with prizes worth $10,000. Build the future of Web3.',
    date: 'April 20-21',
    type: 'hackathon',
    coinsReward: 200,
    registrationFee: 300
  }
];

export default function App() {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    coins: 0,
    streak: 5,
    lastParticipation: new Date().toISOString()
  });

  const handleParticipate = (activity: Activity) => {
    if (activity.registrationFee && user.coins < activity.registrationFee) {
      alert('Not enough coins! Participate in more activities to earn coins.');
      return;
    }

    if (!window.ethereum) {
      throw new Error("No Ethereum provider found");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contractAddress = "0x02Ba285ea67bd805306545ea5Ad3f9269Dd485EB"; // Replace with your actual contract address
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "int256",
            "name": "amt",
            "type": "int256"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "int256",
            "name": "amt",
            "type": "int256"
          }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "coins",
        "outputs": [
          {
            "internalType": "int256",
            "name": "",
            "type": "int256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "int256",
            "name": "",
            "type": "int256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]; // Replace with your actual contract address

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const tx =  contract.deposit(ethers.utils.parseEther(activity.coinsReward.toString()));
    setUser(prev => ({
      ...prev,
      coins: prev.coins + activity.coinsReward - (activity.registrationFee || 0),
      streak: prev.streak + 1,
      lastParticipation: new Date().toISOString()
    }));
    tx.wait();


    

    alert(`Successfully ${activity.registrationFee ? 'registered' : 'participated'}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header coins={user.coins} streak={user.streak} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <Carousel />
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Activities</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MOCK_ACTIVITIES.map(activity => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onParticipate={handleParticipate}
                />
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-medium mb-2">Participate</h3>
                <p className="text-gray-600">Join clubs and activities to earn coins</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="font-medium mb-2">Build Streaks</h3>
                <p className="text-gray-600">Maintain daily activity for bonus rewards</p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-medium mb-2">Redeem</h3>
                <p className="text-gray-600">Use coins for premium events and hackathons</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}