
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
      <h2 className="section-title text-center">Advanced Free AI Tools Capabilities</h2>
      <p className="section-subtitle text-center">
        Stellaris combines cutting-edge AI with specialized knowledge to assist with all aspects of space exploration. 
        <strong className="text-white"> Best free AI tools</strong> from AI WEB TOOLS for comprehensive space mission support.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        <FeatureCard 
          icon={<Star className="h-10 w-10" />}
          title="Find Your Way Home to the Stars"
          description="Remember who you are. Awaken the code. Return to the Light. A galactic spiritual remembrance assistant bridging ancient Earth religions with cosmic truth and your divine origin."
          delay={0.1}
        />
        
        <FeatureCard 
          icon={<Brain className="h-10 w-10" />}
          title="AI Knowledge Base"
          description="Access a vast repository of space exploration data, exoplanet details, and spacecraft systems information with our free AI tools to support your mission planning and execution."
          delay={0.2}
        />
        
        <FeatureCard 
          icon={<FileJson className="h-10 w-10" />}
          title="AI Schematic Generation"
          description="Receive detailed, downloadable schematics for any space mission task using our free AI tools, tailored to your specific needs and mission requirements."
          delay={0.3}
        />
        
        <FeatureCard 
          icon={<Database className="h-10 w-10" />}
          title="AI Data Analysis"
          description="Analyze mission data, statistics, and real-time information with our advanced free AI tools to support critical decision-making during your space endeavors."
          delay={0.4}
        />
        
        <FeatureCard 
          icon={<BarChart3 className="h-10 w-10" />}
          title="AI Predictive Modeling"
          description="Generate accurate predictions and projections for resource management and mission planning using our free AI tools with real-time data and historical trends."
          delay={0.5}
        />
        
        <FeatureCard 
          icon={<Telescope className="h-10 w-10" />}
          title="AI Mission Planning"
          description="Develop comprehensive mission plans, risk assessments, and contingency strategies with our free AI tools to ensure the success of your space exploration initiatives."
          delay={0.6}
        />
        
        <FeatureCard 
          icon={<Rocket className="h-10 w-10" />}
          title="AI Expert Guidance"
          description="Receive guidance on astrogation, sensor analysis, terraforming, colony planning, repairs, and construction from our specialized free AI assistant tools."
          delay={0.7}
        />
      </div>
    </section>
  );
};

export default Features;
