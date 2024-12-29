export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'club' | 'academic' | 'hackathon';
  coinsReward: number;
  registrationFee?: number;
}

export interface User {
  id: string;
  name: string;
  coins: number;
  streak: number;
  lastParticipation: string;
}

export interface CarouselSlideProps {
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}