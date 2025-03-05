
import React from 'react';
import { MessageSquare, LayoutGrid, FileText, Rocket } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="section-container bg-space-gradient">
      <h2 className="section-title text-center">How Stellaris Works</h2>
      <p className="section-subtitle text-center">
        Stellaris uses advanced AI to provide comprehensive space exploration assistance in just a few simple steps.
      </p>
      
      <div className="mt-16 relative">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-space-blue to-space-purple hidden md:block"></div>
        
        {/* Steps */}
        <div className="space-y-24 relative">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Initiate Your Mission</h3>
              <p className="text-gray-300">
                Start your space exploration journey by launching Stellaris and describing your mission objectives. Whether you're planning an exoplanet settlement, analyzing celestial data, or navigating through space, Stellaris is ready to assist.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-space-blue to-space-purple rounded-full blur opacity-70"></div>
                <div className="relative bg-space-black p-6 rounded-full">
                  <MessageSquare className="h-12 w-12 text-space-blue" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Provide Mission Details</h3>
              <p className="text-gray-300">
                Stellaris will ask targeted questions to gather all necessary information about your specific situation. This enables the AI to provide customized support tailored to your unique mission parameters and challenges.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-space-blue to-space-purple rounded-full blur opacity-70"></div>
                <div className="relative bg-space-black p-6 rounded-full">
                  <LayoutGrid className="h-12 w-12 text-space-purple" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Receive Expert Guidance</h3>
              <p className="text-gray-300">
                Based on your mission requirements, Stellaris provides comprehensive data analysis, schematics, predictions, and expert recommendations. All information is presented with step-by-step guidance to ensure clarity and successful implementation.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-space-blue to-space-purple rounded-full blur opacity-70"></div>
                <div className="relative bg-space-black p-6 rounded-full">
                  <FileText className="h-12 w-12 text-space-cyan" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <h3 className="text-2xl font-bold mb-4 text-white">Execute Your Mission</h3>
              <p className="text-gray-300">
                With Stellaris' continuous support, implement your space exploration plans with confidence. The AI assistant will remain engaged throughout the process, suggesting next steps and adapting to new developments to ensure mission success.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-space-blue to-space-purple rounded-full blur opacity-70"></div>
                <div className="relative bg-space-black p-6 rounded-full">
                  <Rocket className="h-12 w-12 text-space-pink" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
