
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TryNowButton from '../components/TryNowButton';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Disclaimer from '../components/Disclaimer';
import Footer from '../components/Footer';
import StarField from '../components/StarField';
import PopupDisclaimer from '../components/PopupDisclaimer';
import FloatingToolsButton from '../components/FloatingToolsButton';
import YouTubeEmbed from '../components/YouTubeEmbed';

const Index: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = "Stellaris: AI Space Exploration Simulator";
    
    // Smooth scroll for internal links
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-space-black text-white overflow-x-hidden">
      <StarField />
      <PopupDisclaimer />
      <Header />
      <main>
        <Hero />
        <Features />
        <TryNowButton />
        <HowItWorks />
        <Testimonials />
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-space-purple to-space-blue bg-clip-text text-transparent">
                Discover More
              </h2>
              <p className="text-space-gray text-xl">
                Continue your journey into the cosmic mysteries
              </p>
            </div>
            <YouTubeEmbed videoId="k1aYXaaAkho" autoplay={false} />
          </div>
        </section>
        <FAQ />
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-space-purple to-space-blue bg-clip-text text-transparent">
                Explore Further
              </h2>
              <p className="text-space-gray text-xl">
                Dive deeper into the cosmic experience
              </p>
            </div>
            <YouTubeEmbed videoId="MYZyst-Vkxg" autoplay={false} />
          </div>
        </section>
        <Disclaimer />
      </main>
      <Footer />
      <FloatingToolsButton />
    </div>
  );
};

export default Index;
