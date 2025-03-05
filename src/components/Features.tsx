
import React from 'react';
import { Rocket, Database, BarChart3, Brain, Telescope, FileJson } from 'lucide-react';

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
      <h2 className="section-title text-center">Advanced Capabilities</h2>
      <p className="section-subtitle text-center">
        Stellaris combines cutting-edge AI with specialized knowledge to assist with all aspects of space exploration.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <FeatureCard 
          icon={<Brain className="h-10 w-10" />}
          title="Comprehensive Knowledge Base"
          description="Access a vast repository of space exploration data, exoplanet details, and spacecraft systems information to support your mission."
          delay={0.2}
        />
        
        <FeatureCard 
          icon={<FileJson className="h-10 w-10" />}
          title="Schematic Generation"
          description="Receive detailed, downloadable schematics for any space mission task, tailored to your specific needs and situation."
          delay={0.3}
        />
        
        <FeatureCard 
          icon={<Database className="h-10 w-10" />}
          title="Advanced Data Analysis"
          description="Analyze mission data, statistics, and real-time information to support critical decision-making during your space endeavors."
          delay={0.4}
        />
        
        <FeatureCard 
          icon={<BarChart3 className="h-10 w-10" />}
          title="Predictive Modeling"
          description="Generate accurate predictions and projections for resource management and mission planning using real-time data and historical trends."
          delay={0.5}
        />
        
        <FeatureCard 
          icon={<Telescope className="h-10 w-10" />}
          title="Mission Planning"
          description="Develop comprehensive mission plans, risk assessments, and contingency strategies to ensure the success of your space exploration initiatives."
          delay={0.6}
        />
        
        <FeatureCard 
          icon={<Rocket className="h-10 w-10" />}
          title="Expert Guidance"
          description="Receive guidance on astrogation, sensor analysis, terraforming, colony planning, repairs, and construction from a specialized AI assistant."
          delay={0.7}
        />
      </div>
    </section>
  );
};

export default Features;
