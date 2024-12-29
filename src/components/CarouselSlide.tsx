import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CarouselSlideProps } from '../types';

export function CarouselSlide({ title, description, imageUrl, ctaText, ctaLink }: CarouselSlideProps) {
  return (
    <div className="min-w-full h-full relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
        <div className="p-8 text-white max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg mb-6">{description}</p>
          <a
            href={ctaLink}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}