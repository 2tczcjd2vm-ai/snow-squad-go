import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import UpcomingCampsPreview from '../components/home/UpcomingCampsPreview';
import GallerySection from '../components/home/GallerySection';
import ReviewsSection from '../components/home/ReviewsSection';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HowItWorksSection />
      <UpcomingCampsPreview />
      <GallerySection />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}