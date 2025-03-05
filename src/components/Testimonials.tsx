
import React from 'react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  delay: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, delay }) => (
  <div 
    className="glass-panel p-6 rounded-xl opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
  >
    <svg className="h-8 w-8 text-space-blue mb-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
    <p className="text-gray-300 mb-4">{quote}</p>
    <div>
      <h4 className="font-semibold text-white">{name}</h4>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="section-container">
      <h2 className="section-title text-center">What Space Explorers Say</h2>
      <p className="section-subtitle text-center">
        Discover how Stellaris is revolutionizing space exploration missions around the galaxy.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <TestimonialCard 
          quote="Stellaris provided critical assistance during our Mars settlement planning phase. The predictive models for resource management saved us months of calculation and significantly improved our mission success rate."
          name="Dr. Alexandra Chen"
          title="Exoplanet Settlement Lead, Mars Colony Initiative"
          delay={0.2}
        />
        
        <TestimonialCard 
          quote="The mission planning capabilities of Stellaris are unmatched. When our navigation systems malfunctioned near Europa, Stellaris calculated alternative routes and provided detailed repair schematics within minutes."
          name="Commander Marcus Rodriguez"
          title="Mission Director, Jupiter Exploration Program"
          delay={0.3}
        />
        
        <TestimonialCard 
          quote="I was skeptical about AI assistance for our atmospheric analysis, but Stellaris exceeded all expectations. The data processing capabilities and accuracy of the terraforming recommendations were remarkable."
          name="Dr. Hiroshi Nakamura"
          title="Chief Scientist, Exoplanet Research Division"
          delay={0.4}
        />
      </div>
    </section>
  );
};

export default Testimonials;
