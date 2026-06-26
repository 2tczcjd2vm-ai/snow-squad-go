import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import UpcomingCampsPreview from '../components/home/UpcomingCampsPreview';
import GallerySection from '../components/home/GallerySection';
import CTASection from '../components/home/CTASection';
import PhilosophySection from '../components/home/PhilosophySection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <PhilosophySection />
      <HowItWorksSection />
      <UpcomingCampsPreview />
      <GallerySection />
      <CTASection />
    </div>
  );
}