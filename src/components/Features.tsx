
import React from 'react';
import { Rocket, Database, BarChart3, Brain, Telescope, FileJson, Star } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}> = ({ icon, title, description, delay }) => (
  <div 
    className="glass-panel p-6 opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
  >
    <div className="mb-4 text-space-blue">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section id="features" className="section-container">
      <h2 className="section-title text-center">Master the Galaxy with Advanced AI Tools</h2>
      <p className="section-subtitle text-center">
        From interstellar empire building to cosmic spiritual awakening - discover the ultimate collection of 
        <strong className="text-white"> specialized AI tools</strong> designed for space exploration, galactic strategy, and consciousness expansion.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <FeatureCard 
          icon={<Rocket className="h-10 w-10" />}
          title="Stellaris AI Space Explorer"
          description="Master galactic empires, plan interstellar colonization, and dominate space strategy. Get expert guidance on fleet composition, technology trees, species design, and diplomatic strategies for Stellaris gameplay."
          delay={0.1}
        />
        
        <FeatureCard 
          icon={<Brain className="h-10 w-10" />}
          title="Advanced Strategic Planning"
          description="Optimize your galactic expansion with AI-powered strategic analysis. Plan trade routes, manage resources across star systems, and develop long-term empire growth strategies for maximum efficiency."
          delay={0.3}
        />
        
        <FeatureCard 
          icon={<FileJson className="h-10 w-10" />}
          title="Custom Empire Design"
          description="Create perfectly balanced custom species, ethics combinations, and government types. Get detailed builds for roleplay scenarios, min-max strategies, and unique galactic civilizations tailored to your playstyle."
          delay={0.4}
        />
        
        <FeatureCard 
          icon={<Database className="h-10 w-10" />}
          title="Technology & Research Optimization"
          description="Navigate complex tech trees with precision. Prioritize research paths for early game advantages, mid-game power spikes, and late-game ascension. Master unity, tradition, and ascension perk selections."
          delay={0.5}
        />
        
        <FeatureCard 
          icon={<BarChart3 className="h-10 w-10" />}
          title="Economic & Military Analysis"
          description="Balance your galactic economy with expert resource management advice. Optimize pop growth, industrial capacity, research output, and military fleet composition for sustained galactic dominance."
          delay={0.6}
        />
        
        <FeatureCard 
          icon={<Telescope className="h-10 w-10" />}
          title="Exploration & Discovery"
          description="Uncover the mysteries of the galaxy with strategic exploration guidance. Learn anomaly priorities, archaeological site management, relic activation, and crisis preparation for ultimate survival."
          delay={0.7}
        />
      </div>
    </section>
  );
};

export default Features;
